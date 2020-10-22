function receipt (menu, order, taxRate=8.64) {
    const receiptData = {};
    receiptData.customer = order.customer;
    receiptData.items = order.items.map(enrichItem);
    return renderPlainText (receiptData, menu, taxRate);

    function enrichItem (anItem) {
        const result = Object.assign({}, anItem)
        return result;
    }
}

function renderPlainText (data, menu, taxRate) {
    let result = `${menu.shopName}\n${menu.address}\n${phoneNumFormat(menu.phone)}\n`;
    result += `${data.customer}\n`;
    for (let item of data.items) {
        result += `${item.id}\t${item.quantity} x` +
            ` ${usd(menu.prices[0][item.id])} =` +
            ` ${usd(item.quantity * menu.prices[0][item.id])}\n`;
    }
    result += `Tax\t${usd(taxTotal(preTaxTotal()))}\n` +
        `Total Amount:\t${usd(totalAmount())}`;
    return result;

    function phoneNumFormat (aPhoneNum) {
        return `+${aPhoneNum[0]} ` +
        `(${aPhoneNum.slice(1, 4)}) ` +
        `${aPhoneNum.slice(4, 7)}` +
        `-${aPhoneNum.slice(7)}`
    }

    function totalAmount () {
        return preTaxTotal() + taxTotal(preTaxTotal());
    }

    function preTaxTotal () {
        let result = 0;
        for (let item of data.items) {
            let itemPrice = menu.prices[0][item.id];
            result += (item.quantity*itemPrice);
        }
        return result;
    }

    function taxTotal (anAmount) {
        return anAmount*taxRate/100;
    }

    function usd (anAmount) {
        return `$${Number.parseFloat(anAmount).toFixed(2)}`;
    }
}

module.exports = receipt;