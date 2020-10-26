function createReceiptData (menu, order, cash) {
    const result = {};
    result.shopName = menu.shopName;
    result.address = menu.address;
    result.phone = menu.phone;
    result.customer = order.customer;
    result.items = order.items.map(enrichItem);
    result.taxRate = order["tax rate"];
    if (order.discounts !== undefined) {
        result.discounts = order.discounts.map(enrichDiscount);
    }
    result.preTaxTotal = preTaxTotal (result);
    result.taxTotal = taxTotal (result);
    result.totalAmount = totalAmount (result);
    if (cash <= result.totalAmount) {
        throw new Error('Total Amount is greater than Cash received')
    } else {
        result.cash = cash;
    }
    result.change = result.cash - result.totalAmount;
    return result;

    function enrichItem (anItem) {
        const result = Object.assign({}, anItem)
        result.unitPrice = menu.prices[anItem.id];
        result.amount = result.quantity * result.unitPrice;
        return result;
    }

    function enrichDiscount (aDiscount) {
        const result = Object.assign({}, aDiscount)
        result.preDiscAmount = preDiscAmountFor (result);
        return result;
    }

    function preDiscAmountFor (aDiscount) {
        if (aDiscount.type === 'item') {
            const discItems = order.items
                .filter(item => aDiscount.items.includes(item.id));
            const result = discItems
                .reduce((total, item) => (total + (item.quantity * menu.prices[item.id])), 0);
            return result;
        }
    }

    function preTaxTotal (data) {
        let result = data.items
            .reduce((total, i) => total + i.amount, 0);
        if (data.discounts !== undefined) {
            result -= data.discounts
                .reduce((total, d) => (total + d.preDiscAmount * d.percent / 100), 0);
        }
        return result;
    }

    function taxTotal (data) {
        return data.preTaxTotal * data.taxRate / 100;
    }

    function totalAmount (data) {
        return data.preTaxTotal + data.taxTotal;
    }
}

module.exports = createReceiptData;