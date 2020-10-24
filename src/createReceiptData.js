const { receipt } = require("./receipt");

function createReceiptData (menu, order, cash) {
    const receiptData = {};
    receiptData.shopName = menu.shopName;
    receiptData.address = menu.address;
    receiptData.phone = menu.phone;
    receiptData.customer = order.customer;
    receiptData.items = order.items.map(enrichItem);
    receiptData.taxRate = order["tax rate"];
    receiptData.preTaxTotal = preTaxTotal (receiptData);
    receiptData.taxTotal = taxTotal (receiptData);
    receiptData.totalAmount = totalAmount (receiptData);
    receiptData.cash = check (cash);
    receiptData.change = cash - receiptData.totalAmount;
    return receiptData;

    function enrichItem (anItem) {
        const result = Object.assign({}, anItem)
        result.unitPrice = menu.prices[anItem.id];
        result.amount = amountFor(result);
        return result;
    
        function amountFor (anItem) {
            return anItem.quantity * anItem.unitPrice;
        }
    }

    function preTaxTotal (data) {
        return data.items
            .reduce((total, i) => total + i.amount, 0);
    }

    function taxTotal (data) {
        return data.preTaxTotal*data.taxRate/100;
    }

    function totalAmount (data) {
        return data.preTaxTotal + data.taxTotal;
    }

    function check (anAmount) {
        if (anAmount <= receiptData.totalAmount) {
            throw new Error('Total Amount is greater than Cash received')
        }    
        return anAmount;
    }
}

module.exports = createReceiptData;