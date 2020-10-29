# Till Tech Test

## Specification

Build a program that:
- generates a receipt for an order 
- recieves price information from a `json` file 
- calculates and outputs correct amount of tax, line totals and total amount
- produces a receipt similiar to the [Sample Receipt](public/img/receipt.jpg)

## Extenion Options

- functionality to record payment amount and calculate correct change.
- functionality to handle discounts such as a 5% discount on orders over $50, and a 10% muffin discount.


## Set Up

Clone this repository and install dependencies 
```
// Jasmine for testing, nyc for code coverage
npm install
```

### Testing

Move into root folder:
```
npm test
```
For coverage 
```
npm run coverage
```

## Design Decisions

- No acceptance criteria was provided however I tried to replicate the [Sample Receipt](public/img/receipt.jpg) as closely as possible.
- The tax rate was defined as 8.64%, which I decided to be included in the order data opposed to passing it as an argument to minimise the amount of arguments.
- I decided that the orders will be `json` objects to keep consistency with the provided `menu.json` alongside JSON being a straightforward language-agnostic median to transfer data.

### Extensions

- For the discounts I decided to seperate the two forms of suggested discount as one applies to items and the other the final total. Details of both discounts are within the `order.json` file provided to the receipt creating program, with the functionality for the program to have multiple item discoynts but only one total discount, with my reaoning being there could be multiple item discounts but onl ever one total discount applied to an order.

### Example Order

```
{
    "customer": "Geraldine",
    "items": [
        {
            "id": "Blueberry Muffin",
            "quantity": 10 
        },
        {
            "id": "Chocolate Chip Muffin",
            "quantity": 8
        },
        {
            "id": "Tea",
            "quantity": 3
        }
    ],
    "taxRate": 8.64,
    "itemDiscounts" : [
        {
            "items": [
                "Blueberry Muffin",
                "Chocolate Chip Muffin"
            ],
            "percent": 10
        }
    ],
    "totalDisc" : {
        "limit": 50,
        "percent": 5
    }
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

As the coffee shop owner
So I can offer discount when customers spend over a certain amount
I want total specific discounts to be appliable
```
