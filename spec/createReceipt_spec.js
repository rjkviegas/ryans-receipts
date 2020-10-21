const createReceipt = require('../src/createReceipt');
const prices = require('../src/json/prices/prices.json');

describe('createReceipt', function () {
    describe('receipt header', function () {
        it('returns coffee shop name', function () {
            expect(createReceipt(prices)).toContain(
                'The Coffee Connection\n'
            );
        });
        it('returns coffee shop address', function () {
            expect(createReceipt(prices)).toContain(
                '123 Lakeside Way\n'
            );
        });
        it('returns coffee shop phone number', function () {
            expect(createReceipt(prices)).toContain(
                '+1 (650) 360-0708\n'
            );
        });
    })
    describe('with order', function () {
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
        it('returns customer name', function () {
            expect(createReceipt(prices, orderJson)).toContain(
                'Jane\n'
            );
        });
    });
});