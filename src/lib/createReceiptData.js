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
        const calculator = new ItemCalculator(anItem, menu, order);
        const result = Object.assign({}, anItem);
        result.unitPrice = calculator.price;
        result.amount = calculator.amount;
        result.discPercent = calculator.discPercent;
        result.discAmount = calculator.discAmount;
        result.totalAmount = result.amount - result.discAmount;
        return result;
    }

    function discPercentFor (anItem) {
        if (order.itemDiscounts !== undefined) {
            const disc = order.itemDiscounts
                .find(discount => discount.items.includes(anItem.id)); 
            return (disc !== undefined ? disc.percent : 0);
        } else {
            return 0
        }
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

class ItemCalculator {
    constructor(anItem, aMenu, anOrder) {
        this.item = anItem;
        this.menu = aMenu;
        this.order = anOrder;
    }

    get price() {
        return this.menu.prices[this.item.id]
    }

    get amount() {
        return this.item.quantity * this.price;
    }

    get discPercent() {
        if (this.order.itemDiscounts !== undefined) {
            const disc = this.order.itemDiscounts
                .find(discount => discount.items.includes(this.item.id)); 
            return (disc !== undefined ? disc.percent : 0);
        } else {
            return 0
        }
    }

    get discAmount() {
        return this.amount * this.discPercent / 100
    }
}

class TotalsCalculator {
    constructor(receiptData, order) {
        this.receiptData = receiptData;
        this.order = order;
    }

    get preTaxTotal() {
        return this.receiptData.items.reduce((total, i) => total + i.totalAmount, 0);
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