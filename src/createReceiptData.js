function createReceiptData (menu, order, taxRate) {
    const receiptData = {};
    receiptData.shopName = menu.shopName;
    receiptData.address = menu.address;
    receiptData.phone = menu.phone;
    receiptData.customer = order.customer;
    receiptData.items = order.items.map(enrichItem);
    receiptData.preTaxTotal = preTaxTotal (receiptData);
    receiptData.taxTotal = taxTotal (receiptData);
    receiptData.totalAmount = totalAmount (receiptData);
    return receiptData;

    function enrichItem (anItem) {
        const result = Object.assign({}, anItem)
        result.unitPrice = unitPriceFor(anItem);
        result.amount = amountFor(result);
        return result;

        function unitPriceFor (anItem) {
            return menu.prices[0][anItem.id];
        }
    
        function amountFor (anItem) {
            return anItem.quantity * anItem.unitPrice;
        }
    }

    function preTaxTotal (data) {
        return data.items
            .reduce((total, i) => total + i.amount, 0);
    }

    function taxTotal (data) {
        return data.preTaxTotal*taxRate/100;
    }

    function totalAmount (data) {
        return data.preTaxTotal + data.taxTotal;
    }
}

module.exports = createReceiptData;