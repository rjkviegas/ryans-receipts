const createReceiptData = require('./createReceiptData');

const receipt = function (menu, order) {
    return renderPlainText (createReceiptData (menu, order));
}

function renderPlainText (data) {
    const pad = 25;
    let result = `${data.shopName}\n${data.address}\n${phoneNumFormat(data.phone)}\n`;
    result += `${data.customer}\n`;
    for (let item of data.items) {
        result += `${item.id.padEnd(pad)}` +
            `${item.quantity} x ${usd(item.unitPrice)} = ` +
            `${usd(item.amount)}\n`;
    }
    if (data.itemDiscounts !== undefined) {
        for (let discount of data.itemDiscounts) {
            result += 'Disc:'.padEnd(pad) + `${discount.percent}% from ${usd(discount.preAmount)}\n`;
        }
    }
    result += 'Tax:'.padEnd(pad) + `${usd(data.taxTotal)}\n`;
    result += 'Total Amount:'.padEnd(pad) + `${usd(data.totalAmount)}\n`;
    if (data.totalDiscount !== undefined) {
        result += `${data.totalDiscount.percent}% discount applies ` +
            `as total is over ${usd(data.totalDiscount.limit)}\n`;
        result += 'Final Amount:'.padEnd(pad) + `${usd(data.finalAmount)}\n`
    }
    result += 'Cash:'.padEnd(pad) + `${usd(data.cash)}\n`;
    result += 'Change:'.padEnd(pad) + `${usd(data.change)}\n`;
    return result;
}

const htmlReceipt = function (menu, order, cash) {
    return renderHtml (createReceiptData(menu, order, cash));
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
    if (data.itemDiscounts !== undefined) {
        for (let discount of data.itemDiscounts) {
            result += `<p>Disc:\t\t${discount.percent}% from ${usd(discount.preAmount)}</p>\n`;
        }
    }
    result += `<p>Tax:\t\t<em>${usd(data.taxTotal)}</em></p>\n`
    result += `<p>Total Amount:\t\t<em>${usd(data.totalAmount)}</em></p>\n`;
    if (data.totalDiscount !== undefined) {
        result += `<p><em>${data.totalDiscount.percent}% discount applies ` +
            `as total is over ${usd(data.totalDiscount.limit)}</em></p>\n`;
        result += `<p>Final Amount:\t\t<em>${usd(data.finalAmount)}</em></p>\n`
    }
    result += `<p>Cash:\t\t<em>${usd(data.cash)}</em></p>\n`;
    result += `<p>Change:\t<em>${usd(data.change)}</em></p>\n`;
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

module.exports = { receipt, htmlReceipt };
