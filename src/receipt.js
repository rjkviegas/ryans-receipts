const createReceiptData = require('./createReceiptData');

exports.receipt = function (menu, order) {
    return renderPlainText (createReceiptData (menu, order));
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
}

exports.htmlReceipt = function (menu, order) {
    return renderHtml (createReceiptData(menu, order));
}

function renderHtml (data) {
    let result = `<h1>${data.shopName}</h1>\n`
    result += `<h3>${data.address}</h3>\n<h3>${phoneNumFormat(data.phone)}</h3>\n`;
    result += `<h2>${data.customer}</h2>\n`;
    result += '<table>\n';
    result += '<tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>';
    for (let item of data.items) {
        result += `<tr><td>${item.id}</td><td>${item.quantity}</td><td>` +
        `${usd(item.unitPrice)}</td><td>${usd(item.amount)}</td></tr>\n`;
    }
    result += '</table>\n';
    result += `<h2>Tax: ${usd(data.taxTotal)}</h2>\n<h2>Total Amount: ${usd(data.totalAmount)}</h2>`;
    return result;
}

function phoneNumFormat (aPhoneNum) {
    return `+${aPhoneNum[0]} ` +
    `(${aPhoneNum.slice(1, 4)}) ` +
    `${aPhoneNum.slice(4, 7)}` +
    `-${aPhoneNum.slice(7)}`
}

function usd (anAmount) {
    return `$${Number.parseFloat(anAmount).toFixed(2)}`;
}
