const { ItemCalculator, WithItemDiscountsCalculator } = require('./ItemCalculator');
const { TotalsCalculator, WithTotalDiscountCalculator } = require('./TotalsCalculator');

function createReceipt (menu, order) {
    const result = {};
    result.shopName = menu.shopName;
    result.address = menu.address;
    result.phone = menu.phone;
    result.customer = order.customer;
    result.taxRate = order.taxRate;
    result.items = order.items.map(enrichItem);
    result.itemDiscounts = itemDiscountsFor(order);
    const calculator = createTotalsCalculator(result, order);
    result.preTaxTotal = calculator.preTaxTotal;
    result.taxTotal = calculator.taxTotal;
    result.totalAmount = calculator.totalAmount;
    result.finalAmount = calculator.finalAmount;
    result.cash = calculator.cash;
    result.change = calculator.change;
    return result;

    function enrichItem (item) {
        const calculator = createItemCalculator(item, menu, order);
        const result = Object.assign({}, item);
        result.unitPrice = calculator.price;
        result.amount = calculator.amount;
        result.discPercent = calculator.discPercent;
        result.discAmount = calculator.discAmount;
        result.totalAmount = calculator.totalAmount;
        return result;
    }

    function createItemCalculator (item, menu, order) {
        if (order.itemDiscounts !== undefined) {
            return new WithItemDiscountsCalculator(item, menu, order);    
        }
        return new ItemCalculator(item, menu, order);
    }

    function itemDiscountsFor (order) {
        if (order.itemDiscounts !== undefined) {
            return order.itemDiscounts.map(addItemDiscountTotal);
        }
    }

    function addItemDiscountTotal (discount) {
        const result = Object.assign({}, discount);
        result.preAmount = order.items
            .filter(item => discount.items.includes(item.id))
            .reduce((total, item) => (total + (item.quantity * menu.prices[item.id])), 0);
        return result;
    }

    function createTotalsCalculator (receipt, order) {
        if (order.totalDiscount !== undefined) {
            return new WithTotalDiscountCalculator(receipt, order);
        }
        return new TotalsCalculator(receipt, order);
    }
}

module.exports = createReceipt;
