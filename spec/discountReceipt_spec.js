const { receipt } = require('../src/lib/receipt');
const menuJson = require('../src/json/menus/menu.json');
const muffinOrderJson = require('../src/json/sampleOrders/discounted/itemDiscOrder.json');
const totalDiscOrderJson = require('../src/json/sampleOrders/discounted/totalDiscOrder.json');

describe('receipt with muffin discount', function () {
    const testReceipt = receipt(menuJson, muffinOrderJson);
    const pad = 25;
    it('returns percentage and amount applied to', function () {
        expect(testReceipt).toContain(
            'Disc:'.padEnd(pad) + '10% from $4.05\n'
        );
    });
    it('returns tax total', function () {
        expect(testReceipt).toContain(
            'Tax:'.padEnd(pad) + '$0.31\n'
        );
    });
    it('returns total amount', function () {
        expect(testReceipt).toContain(
            'Total Amount:'.padEnd(pad) + '$3.96\n'
        );
    });
});

describe('receipt with total over 50 discount', function () {
    const testReceipt = receipt(menuJson, totalDiscOrderJson);
    const pad = 25;
    it('returns percentage and amount applied to', function () {
        expect(testReceipt).toContain(
            '5% discount applies as total is over $50.00\n'
        );
    });
    it('returns total amount', function () {
        expect(testReceipt).toContain(
            'Final Amount:'.padEnd(pad) + '$75.34\n'
        );
    });
});
