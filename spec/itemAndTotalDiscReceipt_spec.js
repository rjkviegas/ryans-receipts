const { receipt } = require('../src/lib/receipt.js');
const menuJson = require('../src/json/menus/menu.json');
const orderJson = require('../src/json/sampleOrders/discounted/itemAndTotalDiscOrder.json');

describe('receipt', function () {
    const testReceipt = receipt (menuJson, orderJson, 100.00);
    const pad = 25;
    it('returns receipt in plain text', function () {
        expect(testReceipt).toEqual(
            'The Coffee Connection\n123 Lakeside Way\n+1 (650) 360-0708\n' +
            'Geraldine\n' +
            'Blueberry Muffin'.padEnd(pad) + '10 x $4.05 = $40.50\n' +
            'Chocolate Chip Muffin'.padEnd(pad) + '8 x $4.05 = $32.40\n' +
            'Tea'.padEnd(pad) + '3 x $3.65 = $10.95\n' +
            'Disc:'.padEnd(pad) + '10% from $72.90\n' +
            'Tax:'.padEnd(pad) + '$6.61\n' +
            'Total Amount:'.padEnd(pad) + '$83.17\n' +
            '5% discount applies as total is over $50.00\n' +
            'Final Amount:'.padEnd(pad) + '$79.02\n' +
            'Cash:'.padEnd(pad) + '$100.00\n' +
            'Change:'.padEnd(pad) + '$20.98\n'
        );
    });
});
