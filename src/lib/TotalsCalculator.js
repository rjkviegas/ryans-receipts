class TotalsCalculator {
    constructor(receipt, order) {
        this.receipt = receipt;
        this.order = order;
    }

    get preTaxTotal() {
        return this.receipt.items.reduce((total, i) => total + i.totalAmount, 0);
    }

    get taxTotal() {
        return this.preTaxTotal * this.receipt.taxRate/100;
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

class WithTotalDiscountCalculator extends TotalsCalculator {

    get finalAmount() {
        if (this.totalAmount < this.order.totalDiscount.limit) return super.finalAmount;

        this.receipt.totalDiscount = this.order.totalDiscount;
        this.receipt.totalDiscount.amount = this.totalAmount;
        return this.totalAmount * (1 - (this.receipt.totalDiscount.percent/100)); 
    }
}

module.exports = { TotalsCalculator, WithTotalDiscountCalculator };