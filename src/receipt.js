function receipt (menu, order, taxRate=8.64) {
    const receiptData = {};
    receiptData.customer = order.customer;
    receiptData.items = order.items.map(enrichItem);
    receiptData.preTaxTotal = preTaxTotal (receiptData);
    return renderPlainText (receiptData, menu, taxRate);

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
        let result = 0;
        for (let item of data.items) {
            result += item.amount;
        }
        return result;
    }
}

function renderPlainText (data, menu, taxRate) {
    let result = `${menu.shopName}\n${menu.address}\n${phoneNumFormat(menu.phone)}\n`;
    result += `${data.customer}\n`;
    for (let item of data.items) {
        result += `${item.id}\t${item.quantity} x` +
            ` ${usd(item.unitPrice)} =` +
            ` ${usd(item.amount)}\n`;
    }
    result += `Tax\t${usd(taxTotal(data.preTaxTotal))}\n` +
        `Total Amount:\t${usd(totalAmount())}`;
    return result;

    function phoneNumFormat (aPhoneNum) {
        return `+${aPhoneNum[0]} ` +
        `(${aPhoneNum.slice(1, 4)}) ` +
        `${aPhoneNum.slice(4, 7)}` +
        `-${aPhoneNum.slice(7)}`
    }

    function totalAmount () {
        return data.preTaxTotal + taxTotal(data.preTaxTotal);
    }

    function taxTotal (anAmount) {
        return anAmount*taxRate/100;
    }

    function usd (anAmount) {
        return `$${Number.parseFloat(anAmount).toFixed(2)}`;
    }
}

module.exports = receipt;