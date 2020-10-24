function createReceiptData (menu, order, cash) {
    const result = {};
    result.shopName = menu.shopName;
    result.address = menu.address;
    result.phone = menu.phone;
    result.customer = order.customer;
    result.items = order.items.map(enrichItem);
    result.taxRate = order["tax rate"];
    if (order.discount !== undefined) {
        result.discount = order.discount;
        result.discount.amount = discAmountFor (result);
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
        result.amount = amountFor(result);
        return result;
    
        function amountFor (anItem) {
            return anItem.quantity * anItem.unitPrice;
        }
    }

    function discAmountFor (data) {
        const discItemId = data.discount.id;
        const discItem = data.items.find(item => (item.id).toLowerCase().includes(discItemId));
        return discItem.amount;
    }

    function preTaxTotal (data) {
        let result = data.items
            .reduce((total, i) => total + i.amount, 0);
        if (data.discount !== undefined) {
            result -= data.discount.amount * data.discount.percent / 100;
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