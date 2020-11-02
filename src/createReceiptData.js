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
    const calculator = new TotalsCalculator(result)
    result.preTaxTotal = calculator.preTaxTotal;
    result.taxTotal = calculator.taxTotal;
    result.totalAmount = calculator.totalAmount;
    if (order.totalDisc !== undefined && result.totalAmount > order.totalDisc.limit) {
        result.totalDisc = order.totalDisc;
        result.totalDisc.amount = result.totalAmount;
        result.finalAmount = applyTotalDisc (result); 
    } else {
        result.finalAmount = result.totalAmount;
    }
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
        const discItems = order.items
            .filter(item => aDiscount.items.includes(item.id));
        const result = discItems
            .reduce((total, item) => (total + (item.quantity * menu.prices[item.id])), 0);
        return result;
    }

    function applyTotalDisc (data) {
        return data.totalAmount * (1 - (data.totalDisc.percent / 100));
    }
}

class TotalsCalculator {
    constructor(receiptData) {
        this.receiptData = receiptData
    }

    get preTaxTotal() {
        let result = this.receiptData.items
            .reduce((total, i) => total + i.amount, 0);
        if (this.receiptData.itemDiscounts !== undefined) {
            result -= this.receiptData.itemDiscounts
                .reduce((total, d) => (total + d.preAmount * d.percent / 100), 0);
        }
        return result;
    }

    get taxTotal() {
        return this.receiptData.preTaxTotal * this.receiptData.taxRate / 100;
    }

    get totalAmount() {
        return this.receiptData.preTaxTotal + this.receiptData.taxTotal;
    }
}

module.exports = createReceiptData;