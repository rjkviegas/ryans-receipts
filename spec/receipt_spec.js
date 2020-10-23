const { receipt } = require('../src/receipt');
const menu = require('../src/json/menus/menu.json');
const sampleOrder1 = require('./sampleOrders/sampleOrder1.json');

describe('receipt', function () {
    const taxRate = 8.64;
    const testReceipt = receipt(menu, sampleOrder1, taxRate)
    describe('header', function () {
        it('shop name', function () {
            expect(testReceipt).toContain(
                'The Coffee Connection\n'
            );
        });
        it('address', function () {
            expect(testReceipt).toContain(
                '123 Lakeside Way\n'
            );
        });
        it('phone number', function () {
            expect(testReceipt).toContain(
                '+1 (650) 360-0708\n'
            );
        });
    })
    describe('body', function () {
        it('customer name', function () {
            expect(testReceipt).toContain(
                'Jane\n'
            );
        });
        it('returns items ordered', function () {
            expect(testReceipt).toContain(
                `Cafe Latte\t2 x $4.75 = $9.50\n`
            );
            expect(testReceipt).toContain(
                `Blueberry Muffin\t1 x $4.05 = $4.05\n`
            );
            expect(testReceipt).toContain(
                `Choc Mudcake\t1 x $6.40 = $6.40\n`
            );
        });
    });
    describe('totals', function () {
        it('returns tax total', function () {
            expect(testReceipt).toContain(
                'Tax\t$1.72\n'
            );
        });
        it('returns total amount', function () {
            expect(testReceipt).toContain(
                'Total Amount:\t$21.67'
            );
        });
    });
});