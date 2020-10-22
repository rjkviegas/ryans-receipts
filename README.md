# Till Tech Test

## Specification

Build a program that:
1. generates a receipt for an order 
2. recieves price information taken from a `json` file 
3. calculates and outputs correct amount of tax, line totals and total amount
4. produces a receipt similiar to the [Sample Receipt](images/receipt.jpg)

## Sample Orders

No official acceptance criteria provided however suggested sample orders are as follows:
```
Jane
2 x Cafe Latte
1 x Blueberry Muffin
1 x Choc Mudcake

John
4 x Americano
2 x Tiramisu
5 x Blueberry Muffin
```
To keep consistency with the `menu.json` file the orders will be input as their own `order.json` file eg:
*orders.json*...
```
[
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
]
```
The tax rate is defined as 8.64%

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
```
