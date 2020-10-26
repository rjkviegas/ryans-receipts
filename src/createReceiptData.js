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
    result.preTaxTotal = preTaxTotal (result);
    result.taxTotal = taxTotal (result);
    result.totalAmount = totalAmount (result);
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
        return result;
    }

    function enrichItemDiscount (aDiscount) {
        const result = Object.assign({}, aDiscount);
        result.preDiscAmount = preDiscAmountFor (result);
        return result;
    }

    function preDiscAmountFor (aDiscount) {
        const discItems = order.items
            .filter(item => aDiscount.items.includes(item.id));
        const result = discItems
            .reduce((total, item) => (total + (item.quantity * menu.prices[item.id])), 0);
        return result;
    }

    function preTaxTotal (data) {
        let result = data.items
            .reduce((total, i) => total + i.amount, 0);
        if (data.itemDiscounts !== undefined) {
            result -= data.itemDiscounts
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

    function applyTotalDisc (data) {
        return data.totalAmount * (1 - (data.totalDisc.percent / 100));
    }
}

module.exports = createReceiptData;