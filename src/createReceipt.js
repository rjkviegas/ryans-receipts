function createReceipt (prices) {
    let result = '';
    result += receiptHeader(prices)
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
}

module.exports = createReceipt;