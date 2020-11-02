function createReceiptData (menu, order) {
    const result = {};
    result.shopName = menu.shopName;
    result.address = menu.address;
    result.phone = menu.phone;
    result.customer = order.customer;
    result.taxRate = order.taxRate;
    result.items = order.items.map(enrichItem);
    if (order.itemDiscounts !== undefined) {
        result.itemDiscounts = order.itemDiscounts.map(enrichItemDiscount);
    }
    const calculator = createTotalsCalculator(result, order);
    result.preTaxTotal = calculator.preTaxTotal;
    result.taxTotal = calculator.taxTotal;
    result.totalAmount = calculator.totalAmount;
    result.finalAmount = calculator.finalAmount;
    result.cash = calculator.cash;
    result.change = calculator.change;
    return result;

    function enrichItem (anItem) {
        const result = Object.assign({}, anItem);
        result.unitPrice = menu.prices[anItem.id];
        result.amount = result.quantity * result.unitPrice;
        return result;
    }

    function enrichItemDiscount (aDiscount) {
        const result = Object.assign({}, aDiscount);
        result.preAmount = preDiscountAmountFor (result);
        return result;
    }

    function preDiscountAmountFor (aDiscount) {
        return order.items
            .filter(item => aDiscount.items.includes(item.id))
            .reduce((total, item) => (total + (item.quantity * menu.prices[item.id])), 0);
    }

    function createTotalsCalculator(receiptData, anOrder) {
        if (anOrder.totalDiscount !== undefined) {
            return new TotalDiscountCalculator(receiptData, anOrder);
        }
        return new TotalsCalculator(receiptData, anOrder);
    }
}

class TotalsCalculator {
    constructor(receiptData, order) {
        this.receiptData = receiptData;
        this.order = order;
    }

    get preTaxTotal() {
        let result = this.receiptData.items
            .reduce((total, i) => total + i.amount, 0);
        if (this.receiptData.itemDiscounts === undefined) return result;
        
        return result -= this.receiptData.itemDiscounts
            .reduce((total, d) => (total + d.preAmount * d.percent / 100), 0);
    }

    get taxTotal() {
        return this.preTaxTotal * this.receiptData.taxRate / 100;
    }

    get totalAmount() {
        return this.preTaxTotal + this.taxTotal;
    }

    get cash() {
        return this.order.cash
    }

    get change() {
        return this.cash - this.finalAmount
    }

    get finalAmount() {
        return this.totalAmount;
    }
}

class TotalDiscountCalculator extends TotalsCalculator {

    get finalAmount() {
        if (this.totalAmount < this.order.totalDiscount.limit) return super.finalAmount;

        this.receiptData.totalDiscount = this.order.totalDiscount;
        this.receiptData.totalDiscount.amount = this.totalAmount;
        return this.totalAmount * (1 - (this.receiptData.totalDiscount.percent / 100)); 
    }
}

module.exports = createReceiptData;