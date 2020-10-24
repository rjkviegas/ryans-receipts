const { htmlReceipt } = require('../src/receipt');
const menuJson = require('../src/json/menus/menu.json');
const orderJson = require('./sampleOrders/sampleOrder2.json');

describe('htmlReceipt', function () {
    const testHtmlReceipt = htmlReceipt(menuJson, orderJson)
    describe('header', function () {
        it('shop name', function () {
            expect(testHtmlReceipt).toContain(
                '<h1>The Coffee Connection</h1>\n'
            );
        });
        it('address', function () {
            expect(testHtmlReceipt).toContain(
                '<h3>123 Lakeside Way</h3>\n'
            );
        });
        it('phone number', function () {
            expect(testHtmlReceipt).toContain(
                '<h3>+1 (650) 360-0708</h3>\n'
            );
        });
        it('customer name', function () {
            expect(testHtmlReceipt).toContain(
                '<h2>John</h2>\n'
            );
        });
    })
    describe('body', function () {
        it('table of items ordered', function () {
            expect(testHtmlReceipt).toContain(
                '<table>\n<tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>'
            );
            expect(testHtmlReceipt).toContain('</table>\n');
        });
        it('items ordered', function () {
            expect(testHtmlReceipt).toContain(
                `<tr><td>Americano</td><td>4</td><td>$3.75</td><td>$15.00</td></tr>\n`
            );
            expect(testHtmlReceipt).toContain(
                `<tr><td>Tiramisu</td><td>2</td><td>$11.40</td><td>$22.80</td></tr>\n`
            );
            expect(testHtmlReceipt).toContain(
                `<tr><td>Blueberry Muffin</td><td>5</td><td>$4.05</td><td>$20.25</td></tr>\n`
            );
        });
    });
    describe('totals', function () {
        it('returns tax total', function () {
            expect(testHtmlReceipt).toContain(
                '<h2>Tax: $5.02</h2>\n'
            );
        });
        it('returns total amount', function () {
            expect(testHtmlReceipt).toContain(
                '<h2>Total Amount: $63.07</h2>'
            );
        });
    });
});