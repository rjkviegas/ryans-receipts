const { receipt } = require('../src/receipt');
const menuJson = require('../src/json/menus/menu.json');
const muffinOrderJson = require('./sampleOrders/discounted/muffinOrder.json');
const overFiftyOrderJson = require('./sampleOrders/discounted/overFiftyOrder.json');

describe('receipt with muffin discount', function () {
    const testReceipt = receipt(menuJson, muffinOrderJson, 10.00);
    it('returns percentage and amount applied to', function () {
        expect(testReceipt).toContain(
            'Disc:\t\t10% from $4.05\n'
        );
    });
    it('returns tax total', function () {
        expect(testReceipt).toContain(
            'Tax\t$0.31\n'
        );
    });
    it('returns total amount', function () {
        expect(testReceipt).toContain(
            'Total Amount:\t$3.96\n'
        );
    });
});

describe('receipt with total over 50 discount', function () {
    const testReceipt = receipt(menuJson, overFiftyOrderJson, 80.00);
    it('returns percentage and amount applied to', function () {
        expect(testReceipt).toContain(
            '5% discount applies as total is over $50.00\n'
        );
    });
    it('returns total amount', function () {
        expect(testReceipt).toContain(
            'Final Amount:\t\t$75.34\n'
        );
    });
});
