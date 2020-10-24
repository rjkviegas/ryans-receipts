const { htmlReceipt } = require('../src/receipt');
const menuJson = require('../src/json/menus/menu.json');
const orderJson = require('./sampleOrders/discounted/muffinOrder.json');

describe('htmlReceipt with discount', function () {
    const testHtmlReceipt = htmlReceipt(menuJson, orderJson, 10.00);
    it('returns percentage and amount applied to', function () {
        expect(testHtmlReceipt).toContain(
            '<p>Disc:\t\t10% from $4.05</p>\n'
        );
    });
    it('returns tax total', function () {
        expect(testHtmlReceipt).toContain(
            '<p>Tax:\t\t<em>$0.31</em></p>\n'
        );
    });
    it('returns total amount', function () {
        expect(testHtmlReceipt).toContain(
            '<p>Total Amount:\t\t<em>$3.96</em></p>\n'
        );
    });
});