const createReceiptData = require('./createReceiptData');

function receipt (menu, order, taxRate=8.64) {
    return renderPlainText (createReceiptData (menu, order, taxRate));
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