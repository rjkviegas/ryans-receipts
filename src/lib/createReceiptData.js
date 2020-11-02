function createReceiptData (menu, order, cash) {
    const result = {};
    result.shopName = menu.shopName;
    result.address = menu.address;
    result.phone = menu.phone;
    result.customer = order.customer;
    result.items = order.items.map(enrichItem);
    result.taxRate = order.taxRate;
    if (order.itemDiscounts !== undefined) {
        result.itemDiscounts = order.itemDiscounts.map(enrichItemDiscount);
    }
    const calculator = new TotalsCalculator(result, order)
    result.preTaxTotal = calculator.preTaxTotal;
    result.taxTotal = calculator.taxTotal;
    result.totalAmount = calculator.totalAmount;
    result.finalAmount = calculator.finalAmount;
    result.cash = cash;
    result.change = result.cash - result.finalAmount;
    return result;

    function enrichItem (anItem) {
        const result = Object.assign({}, anItem);
        result.unitPrice = menu.prices[anItem.id];
        result.amount = result.quantity * result.unitPrice;
        result.discount = order.discItems
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
        if (this.data.itemDiscounts === undefined) return result
        
        return result -= this.data.itemDiscounts
            .reduce((total, d) => (total + d.preAmount * d.percent / 100), 0);
    }

    get taxTotal() {
        return this.data.preTaxTotal * this.data.taxRate / 100;
    }

    get totalAmount() {
        return this.data.preTaxTotal + this.data.taxTotal;
    }

    get finalAmount() {
        if (this.order.totalDisc === undefined ||
            this.data.totalAmount < this.order.totalDisc.limit) return this.data.totalAmount 

        this.data.totalDisc = this.order.totalDisc;
        this.data.totalDisc.amount = this.data.totalAmount;
        return this.data.totalAmount * (1 - (this.data.totalDisc.percent / 100)); 
    }
}

module.exports = createReceiptData;