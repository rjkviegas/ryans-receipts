const createReceipt = require('../src/createReceipt');
const prices = require('../src/json/prices/prices.json');

describe('createReceipt', function () {
    it('returns coffee shop name', function () {
        expect(createReceipt(prices)).toContain(
            'The Coffee Connection\n'
        );
    });
    it('returns coffee shop address', function () {
        expect(createReceipt(prices)).toContain(
            '123 Lakeside Way\n'
        )
    });
    it('returns coffee shop phone number', function () {
        expect(createReceipt(prices)).toContain(
            '+1 (650) 360-0708\n'
        )
    });
});