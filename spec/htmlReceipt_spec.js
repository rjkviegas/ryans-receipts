const { htmlReceipt } = require('../src/receipt');
const menu = require('../src/json/menus/menu.json');
const sampleOrder1 = require('./sampleOrders/sampleOrder1.json');

describe('htmlReceipt', function () {
    const taxRate = 8.64;
    const testHtmlReceipt = htmlReceipt(menu, sampleOrder1, taxRate)
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
                '<h2>Jane</h2>\n'
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
                `<tr><td>Cafe Latte</td><td>2</td><td>$4.75</td><td>$9.50</td></tr>\n`
            );
            expect(testHtmlReceipt).toContain(
                `<tr><td>Blueberry Muffin</td><td>1</td><td>$4.05</td><td>$4.05</td></tr>\n`
            );
            expect(testHtmlReceipt).toContain(
                `<tr><td>Choc Mudcake</td><td>1</td><td>$6.40</td><td>$6.40</td></tr>\n`
            );
        });
    });
    describe('totals', function () {
        it('returns tax total', function () {
            expect(testHtmlReceipt).toContain(
                '<h2>Tax: $1.72</h2>\n'
            );
        });
        it('returns total amount', function () {
            expect(testHtmlReceipt).toContain(
                '<h2>Total Amount: $21.67</h2>'
            );
        });
    });
});