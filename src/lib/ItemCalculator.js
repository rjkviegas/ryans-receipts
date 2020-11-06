class ItemCalculator {
    constructor(item, menu, order) {
        this.item = item;
        this.menu = menu;
        this.order = order;
    }

    get price() {
        return this.menu.prices[this.item.id];
    }

    get amount() {
        return this.item.quantity * this.price;
    }

    get discPercent() {
        return 0;
    }

    get discAmount() {
        return 0;
    }

    get totalAmount() {
        return this.amount;
    }
}

class DiscountCalculator extends ItemCalculator {

    get discPercent() {
        const disc = this.order.itemDiscounts
                .find(discount => discount.items.includes(this.item.id)); 
        return (disc !== undefined ? disc.percent : super.discPercent);
    }

    get discAmount() {
        return this.amount * this.discPercent / 100;
    }

    get totalAmount() {
        return this.amount - this.discAmount;
    }
}

module.exports = { ItemCalculator, DiscountCalculator };
