function receipt (menu, order) {
    let result = '';
    result += header(menu)
    result += body(menu, order);
    result += tax(preTaxTotal(menu, order), 0.086)
    return result;

    function header (menu) {
        let result = '';
        result += `${menu.shopName}\n`;
        result += `${menu.address}\n`;
        result += 
            `+${menu.phone[0]} ` +
            `(${menu.phone.slice(1, 4)}) ` +
            `${menu.phone.slice(4, 7)}` +
            `-${menu.phone.slice(7)}\n`;
        return result;
    }

    function body (menu, order) {
        let result = `${order.customer}\n`
        for (let item of order.items) {
            result += createItemLine(item)
        }
        return result
    }

    function preTaxTotal (menu, order) {
        let result = 0;
        for (let item of order.items) {
            let itemPrice = menu.prices[0][item.id];
            result += (item.quantity*itemPrice);
        }
        return result;
    }

    function tax (preTaxTotal, taxRate) {
        return `Tax\t$${priceFormat(preTaxTotal*taxRate)}`;
    }

    function createItemLine (item) {
        let itemPrice = menu.prices[0][item.id]
        return  `${item.id}\t${item.quantity} x ${priceFormat(itemPrice)}\n`;
    }

    function priceFormat (price) {
        return Number.parseFloat(price).toFixed(2);
    }
}

module.exports = receipt;