function receipt (menu, order) {
    let result = '';
    const taxRate = 8.64;
    result += header(menu)
    result += body(menu, order);
    result += totals(menu, order);
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
            result += createItemLine(menu, item)
        }
        return result
    }

    function totals (menu, order) {
        const preTaxAmount = preTaxTotal(menu, order);
        const taxAmount = (preTaxAmount*taxRate/100);
        const totalAmount = preTaxAmount + taxAmount;
        return  `Tax\t$${priceFormat(taxAmount)}\n` +
            `Total Amount:\t$${priceFormat(totalAmount)}`;
    }

    function preTaxTotal (menu, order) {
        let result = 0;
        for (let item of order.items) {
            let itemPrice = menu.prices[0][item.id];
            result += (item.quantity*itemPrice);
        }
        return result;
    }

    function createItemLine (menu, item) {
        let itemPrice = menu.prices[0][item.id]
        return  `${item.id}\t${item.quantity} x ${priceFormat(itemPrice)}\n`;
    }

    function priceFormat (price) {
        return Number.parseFloat(price).toFixed(2);
    }
}

module.exports = receipt;