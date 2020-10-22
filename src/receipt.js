function receipt (menu, order) {
    let result = '';
    const taxRate = 8.64;
    result += header(menu, order);
    for (let item of order.items) {
        result += `${item.id}\t${item.quantity} x ${usd(menu.prices[0][item.id])}\n`;
    }
    result += `Tax\t${usd(taxTotal(preTaxTotal(menu, order), taxRate))}\n` +
        `Total Amount:\t${usd(totalAmount(menu, order))}`;
    return result;

    function header (menu, order) {
        let result = '';
        result += `${menu.shopName}\n`;
        result += `${menu.address}\n`;
        result += phoneNumFormat(menu.phone);
        result += `${order.customer}\n`;
        return result;
    }

    function phoneNumFormat (aPhoneNum) {
        return `+${aPhoneNum[0]} ` +
        `(${aPhoneNum.slice(1, 4)}) ` +
        `${aPhoneNum.slice(4, 7)}` +
        `-${aPhoneNum.slice(7)}\n`
    }

    function totalAmount (menu, order) {
        return preTaxTotal(menu, order) + taxTotal(preTaxTotal(menu, order), taxRate);
    }

    function preTaxTotal (menu, order) {
        let result = 0;
        for (let item of order.items) {
            let itemPrice = menu.prices[0][item.id];
            result += (item.quantity*itemPrice);
        }
        return result;
    }

    function taxTotal (amount, taxRate) {
        return amount*taxRate/100;
    }

    function usd (price) {
        return `$${Number.parseFloat(price).toFixed(2)}`;
    }
}

module.exports = receipt;