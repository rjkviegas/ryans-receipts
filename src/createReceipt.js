function createReceipt (menu, order) {
    let result = '';
    result += receiptHeader(menu)
    result += `${order.customer}\n`
    for (let item of order.items) {
        result += createLine(item);
    }
    return result;

    function receiptHeader (menu) {
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

    function createLine (item) {
        let itemPrice = menu.prices[0][item.id]
        return  `${item.id}\t${item.quantity} x ${priceFormat(itemPrice)}\n`;
    }

    function priceFormat (price) {
        return Number.parseFloat(price).toFixed(2);
    }
}

module.exports = createReceipt;