# Till Tech Test

## Specification

Build a program that:
1. generates a receipt for an order 
2. recieves price information taken from a `json` file 
3. calculates and outputs correct amount of tax, line totals and total amount
4. produces a receipt similiar to the [Sample Receipt](images/receipt.jpg)

## Set Up

Clone this repository and install dependencies 
```
// Jasmine for testing, nyc for code coverage
npm install
```

### Testing

Move into root folder `npm test`
For coverage `npm run coverage`

## Design Decisions

No acceptance criteria was provided. 
The tax rate was defined as 8.64%.
The orders will be `json` objects To keep consistency with the `menu.json` eg:
*sampleOrder1.json*...
```
{
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
            "quantity" : 1
        }
    ]
}
```

## User Stories
```
As the coffee shop owner
So it's clear where the receipt is from
I want the receipt to display the coffee shop's information

As the coffee shop owner
So I can charge customers for what they ordered
I want the receipt to display what they ordered

As the coffee shop owner
So I can create bespoke receipts for customers
I want to be able to include their name on the receipt

As the coffee shop owner
So I only have to update one list of price information
I want the receipt program to use our json price file

As the coffee shop owner
So I charge the customers the correct amount
I want the line totals correctly calculated and displayed on the receipt

As the coffee shop owner
So I charge the customers the correct amount
I want the tax correctly calculated and displayed on the receipt

As the coffee shop owner
So I charge the customers the correct amount
I want the total amount correctly calculated and displayed on the receipt

As the coffee shop owner
So I can offer customers item specific discounts
I want item specific discounts to be appliable 
```
