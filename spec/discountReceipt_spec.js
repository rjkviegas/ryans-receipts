const { receipt } = require('../src/receipt');
const menuJson = require('../src/json/menus/menu.json');
const orderJson = require('./sampleOrders/discounted/muffinOrder.json');

describe('receipt with discount', function () {
    const testReceipt = receipt(menuJson, orderJson, 10.00);
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
