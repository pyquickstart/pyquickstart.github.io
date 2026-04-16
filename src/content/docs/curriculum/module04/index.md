---
title: Functions
description: Use functions to generate transaction dictionaries for reproducibility and fewer errors
---

The demo application is coming along. And right now it has some utility. But there is still too much room for error. Let's see how to take the process of creating a dictionary for a transaction and package it in a Python function.

## Functions

A Python function is a named block of code that optionally accepts an input, and optionally returns an output.

We can create a function that accepts the data needed to create a transaction dictionary and it create and return the dictionary.

```python
def create_transaction(coin, amount, buy, timestamp, notes):
    transaction = {
        "coin": coin,
        "amount": amount,
        "buy": buy,
        "timestamp": timestamp,
        "notes": notes
    }

    return transaction
```

Let's unpack the code. First, a function definition starts with the `def` keyword. Next is the name of the function. The input to the function is passed through _parameters_ like `coin` and `amount`. Each parameter is used inside of the function like a variable. While parameters are optional, the parentheses are not. All functions, including those without parameters must have parentheses after the function name. Then a colon terminates the function definition.

We've seen this pattern before. The colon indicates the next line begins the body of the function. And it must be indented. Most of the body code you've seen before. It creates a dictionary using the parameter values, called _arguments_, for the transaction data. The last line of the function body uses the `return` keyword to pass the `transaction` dictionary back to the caller of the function.

What is calling a function? This is invoking the function, by name, passing it any values for the parameters. The function body will be executed and the value returned can be used in the following code.

```python
transaction = create_transaction("bitcoin", 0.5, True, datetime.date(2026, 2, 20))
print(transaction["coin"])      # bitcoin
```

We can build up a list of transactions by appending the return values of subsequent calls to `create_transaction` making the code much easier to read and maintain.

```python
transactions = []
transactions.append(create_transaction("bitcoin", 0.5, True, datetime.date(2026, 2, 20), "Note one"))
transactions.append(create_transaction("ethereum", 1.1, True, datetime.date(2026, 2, 21), "Note two"))
transactions.append(create_transaction("bitcoin", 0.25, False, datetime.date(2026, 2, 22), "Note three"))
```

We can also create a function to display a transaction passing it a dictionary.

```python
def display_transaction(transaction):
    coin = transaction["coin"]
    amount = transaction["amount"]
    action = "Bought" if transaction["buy"] else "Sold"
    formatted_timestamp = transaction["timestamp"].strftime('%b. %e, %Y')
    notes = transaction["notes"] if "notes" in transaction else "No notes found"

    print(f"Transaction on {formatted_timestamp}")
    print(f"{action} {amount} of {coin}")
    print(f"Notes {notes}")
```

Note this function does not return a value and has no `return` statement at the end of the body.

With the `display_transaction` function, list all the transactions takes only a couple of lines.

```python
for transaction in transactions:
    display_transaction(transaction)
```
