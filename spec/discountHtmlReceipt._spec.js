const { htmlReceipt } = require('../src//lib/receipt');
const menuJson = require('../src/json/menus/menu.json');
const orderJson = require('../src/json/sampleOrders/discounted/itemDiscOrder.json');
const overFiftyOrderJson = require('../src/json/sampleOrders/discounted/totalDiscOrder.json');

describe('htmlReceipt with discount', function () {
    const testHtmlReceipt = htmlReceipt(menuJson, orderJson);
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

describe('htmlReceipt with total over 50 discount', function () {
    const testHtmlReceipt = htmlReceipt(menuJson, overFiftyOrderJson);
    it('returns percentage and amount applied to', function () {
        expect(testHtmlReceipt).toContain(
            '<p><em>5% discount applies as total is over $50.00</em></p>\n'
        );
    });
    it('returns total amount', function () {
        expect(testHtmlReceipt).toContain(
            '<p>Final Amount:\t\t<em>$75.34</em></p>\n'
        );
    });
});