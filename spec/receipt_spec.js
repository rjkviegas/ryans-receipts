const { receipt } = require('../src/lib/receipt');
const menuJson = require('../src/json/menus/menu.json');
const orderJson = require('../src/json/sampleOrders/nondiscounted/sampleOrder1.json');

describe('receipt', function () {
    const testReceipt = receipt(menuJson, orderJson)
    const pad = 25;
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
                'Cafe Latte'.padEnd(pad) + '2 x $4.75 = $9.50\n'
            );
            expect(testReceipt).toContain(
                'Blueberry Muffin'.padEnd(pad) + '1 x $4.05 = $4.05\n'
            );
            expect(testReceipt).toContain(
                'Choc Mudcake'.padEnd(pad) + '1 x $6.40 = $6.40\n'
            );
        });
    });
    describe('totals', function () {
        it('returns tax total', function () {
            expect(testReceipt).toContain(
                'Tax:'.padEnd(pad) + '$1.72\n'
            );
        });
        it('returns total amount', function () {
            expect(testReceipt).toContain(
                'Total Amount:'.padEnd(pad) + '$21.67\n'
            );
        });
    });
    describe('cash', function () {
        it('returns amount paid by customer', function () {
            expect(testReceipt).toContain(
                'Cash:'.padEnd(pad) + '$25.00\n'
            );
        });
    });
    describe('change', function () {
        it('returns amount owed to customer', function () {
            expect(testReceipt).toContain(
                'Change:'.padEnd(pad) + '$3.33\n'
            );
        });
    });
});
