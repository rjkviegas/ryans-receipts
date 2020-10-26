const { receipt } = require('../src/receipt.js');
const menuJson = require('../src/json/menus/menu.json');
const orderJson = require('../spec/sampleOrders/discounted/itemAndTotalDiscOrder.json');

describe('receipt', function () {
    const receiptData = receipt (menuJson, orderJson, 100.00);
    it('returns receipt in plain text', function () {
        expect(receiptData).toEqual(
            'The Coffee Connection\n123 Lakeside Way\n+1 (650) 360-0708\n' +
            'Geraldine\n' +
            'Blueberry Muffin\t10 x $4.05 = $40.50\n' +
            'Chocolate Chip Muffin\t8 x $4.05 = $32.40\n' +
            'Tea\t3 x $3.65 = $10.95\n' +
            'Disc:\t\t10% from $72.90\n' +
            'Tax\t$6.61\n' +
            'Total Amount:\t$83.17\n' +
            '5% discount applies as total is over $50.00\n' +
            'Final Amount:\t\t$79.02\n' +
            'Cash:\t$100.00\n' +
            'Change:\t$20.98\n'
        );
    });
});
