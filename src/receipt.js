function receipt (menu, order, taxRate=8.64) {
    return renderPlainText (createReceiptData (menu, order, taxRate));
}

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
    }

    function unitPriceFor (anItem) {
        return menu.prices[0][anItem.id];
    }

    function amountFor (anItem) {
        return anItem.quantity * anItem.unitPrice;
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

function renderPlainText (data) {
    let result = `${data.shopName}\n${data.address}\n${phoneNumFormat(data.phone)}\n`;
    result += `${data.customer}\n`;
    for (let item of data.items) {
        result += `${item.id}\t${item.quantity} x` +
            ` ${usd(item.unitPrice)} =` +
            ` ${usd(item.amount)}\n`;
    }
    result += `Tax\t${usd(data.taxTotal)}\nTotal Amount:\t${usd(data.totalAmount)}`;
    return result;

    function phoneNumFormat (aPhoneNum) {
        return `+${aPhoneNum[0]} ` +
        `(${aPhoneNum.slice(1, 4)}) ` +
        `${aPhoneNum.slice(4, 7)}` +
        `-${aPhoneNum.slice(7)}`
    }

    function usd (anAmount) {
        return `$${Number.parseFloat(anAmount).toFixed(2)}`;
    }
}

module.exports = receipt;