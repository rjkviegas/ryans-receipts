function receipt (menu, order, taxRate=8.64) {
    let result = '';
    result += header(menu, order);
    for (let item of order.items) {
        result += `${item.id}\t${item.quantity} x` +
            ` ${usd(menu.prices[0][item.id])} =` +
            ` ${usd(item.quantity * menu.prices[0][item.id])}\n`;
    }
    result += `Tax\t${usd(taxTotal(preTaxTotal(menu, order), taxRate))}\n` +
        `Total Amount:\t${usd(totalAmount(menu, order))}`;
    return result;

    function header (aMenu, anOrder) {
        let result = '';
        result += `${aMenu.shopName}\n`;
        result += `${aMenu.address}\n`;
        result += phoneNumFormat(aMenu.phone);
        result += `${anOrder.customer}\n`;
        return result;
    }

    function phoneNumFormat (aPhoneNum) {
        return `+${aPhoneNum[0]} ` +
        `(${aPhoneNum.slice(1, 4)}) ` +
        `${aPhoneNum.slice(4, 7)}` +
        `-${aPhoneNum.slice(7)}\n`
    }

    function totalAmount (aMenu, anOrder) {
        return preTaxTotal(aMenu, anOrder) + taxTotal(preTaxTotal(aMenu, anOrder), taxRate);
    }

    function preTaxTotal (aMenu, anOrder) {
        let result = 0;
        for (let item of anOrder.items) {
            let itemPrice = aMenu.prices[0][item.id];
            result += (item.quantity*itemPrice);
        }
        return result;
    }

    function taxTotal (anAmount, aTaxRate) {
        return anAmount*aTaxRate/100;
    }

    function usd (anAmount) {
        return `$${Number.parseFloat(anAmount).toFixed(2)}`;
    }
}

module.exports = receipt;