const receipt = require('../src/receipt');
const menu = require('../src/json/menus/menu.json');

describe('receipt', function () {
    const orderJson = {
        "customer": "Jane",
        "items": [
            {
                "id": "Cafe Latte",
                "quantity": 2
            },
            {
                "id": "Blueberry Muffin",
                "quantity": 1 
            },
            {
                "id": "Choc Mudcake",
                "quantity": 1
            }
        ]
    };
    describe('header', function () {
        it('returns coffee shop name', function () {
            expect(receipt(menu, orderJson)).toContain(
                'The Coffee Connection\n'
            );
        });
        it('returns coffee shop address', function () {
            expect(receipt(menu, orderJson)).toContain(
                '123 Lakeside Way\n'
            );
        });
        it('returns coffee shop phone number', function () {
            expect(receipt(menu, orderJson)).toContain(
                '+1 (650) 360-0708\n'
            );
        });
    })
    describe('body', function () {
        it('returns customer name', function () {
            expect(receipt(menu, orderJson)).toContain(
                'Jane\n'
            );
        });
        it('returns items ordered', function () {
            expect(receipt(menu, orderJson)).toContain(
                `Cafe Latte\t2 x 4.75\n`
            );
        });
        it('returns items ordered', function () {
            expect(receipt(menu, orderJson)).toContain(
                `Blueberry Muffin\t1 x 4.05\n`
            );
        });
        it('returns items ordered', function () {
            expect(receipt(menu, orderJson)).toContain(
                `Choc Mudcake\t1 x 6.40\n`
            );
        });
    });
    describe('totals', function () {
        it('returns tax total', function () {
            expect(receipt(menu, orderJson)).toContain(
                'Tax\t$1.72\n'
            );
        });
        it('returns total amount', function () {
            expect(receipt(menu, orderJson)).toContain(
                'Total Amount:\t$21.67'
            );
        });
    });
});