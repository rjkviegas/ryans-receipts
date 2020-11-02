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
    const calculator = new TotalsCalculator(result, order);
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
}

class TotalsCalculator {
    constructor(data, order) {
        this.data = data;
        this.order = order;
    }

    get preTaxTotal() {
        let result = this.data.items
            .reduce((total, i) => total + i.amount, 0);
        if (this.data.itemDiscounts === undefined) return result;
        
        return result -= this.data.itemDiscounts
            .reduce((total, d) => (total + d.preAmount * d.percent / 100), 0);
    }

    get taxTotal() {
        return this.preTaxTotal * this.data.taxRate / 100;
    }

    get totalAmount() {
        return this.preTaxTotal + this.taxTotal;
    }

    get finalAmount() {
        if (this.order.totalDiscount === undefined ||
            this.totalAmount < this.order.totalDiscount.limit) return this.totalAmount;

        this.data.totalDiscount = this.order.totalDiscount;
        this.data.totalDiscount.amount = this.totalAmount;
        return this.totalAmount * (1 - (this.data.totalDiscount.percent / 100)); 
    }

    get cash() {
        return this.order.cash
    }

    get change() {
        return this.cash - this.finalAmount
    }
}

module.exports = createReceiptData;