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
        "notes": notes,
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
    print(f"Notes: {notes}")
    print("")
```

Note this function does not return a value and has no `return` statement at the end of the body.

With the `display_transaction` function, list all the transactions takes only a couple of lines.

```python
for transaction in transactions:
    display_transaction(transaction)
```

## Function defaults

The `create_transaction` function can be optimized slightly.  Right now, it has five required parameters.  But does every call require all of them?  For example, most often, the `timestamp` is going to be the current date.  So we don't need to provide the current date every time we call the function.  The `datetime` module from the Python standard library can retrieve a `date` object for the current date with a single line.

```python
current_date = datetime.datetime.now().date()
```

This means we can leave out the `timestamp` parameters and assign the current date in the dictionary.

```python
def create_transaction(coin, amount, buy, notes):
    transaction = {
        "coin": coin,
        "amount": amount,
        "buy": buy,
        "notes": notes,
        "timestamp": datetime.datetime.now().date(),
    }

    return transaction
```

We can also make some parameters optional by assigning them a default value.  For example, assign the `buy` parameter a default value of `True`.

```python
def create_transaction(coin, amount, buy=True):
    # body
```

When calling the `create_transaction` function, we can omit a value for the `buy` parameter when creating a transaction buying cryptocurrency and Python will assume it to be `True`.  But if we want to sell a coin, we explicitly pass `False` for the `buy` parameter.

```python
buy_transaction = create_transaction("bitcoin", 0.5)
sell_transaction = create_tranaction("bitcoin", 0.25, False)
```

As for the `notes`, they are also optional.  But there doesn't even have to be a `notes` key in the dictionary.  The notes can literally have no value.  We indicate this by assigning the `None` value as the default for the `notes` parameter.  In Python, the `None` value is the null value.  Here is the updated function.

```python
def create_transaction(coin, amount, buy=True, notes=None):
    transaction = {
        "coin": coin,
        "amount": amount,
        "buy": buy,
        "timestamp": 
    }

    if notes is not None:
        transaction["notes"] = notes

    return transaction
```

This time, only the required keys are added to the dictionary when it is created.  As the `notes` key is optional, we only add it if the `notes` parameter is not `None`.

> Note
> You might have noticed that the code uses the `is` keyword to determine the value of `notes` and not the equality operator.  This is a subtle point when using `None`.  It is one of the built in values in Python (like `True` and `False`) and is also a singleton.  The `is` keyword checks for object identity to ensure the `notes` parameters refers to the same object.  If the code used the equality operator, depending on how the value being compared is designed, it could give misleading answers.  The `is` keyword is therefore the correct Pythonic usage.

We can now simplify the `create_transaction` calls.

To create a buy transaction with no notes:

```python
transaction = create_transaction("bitcoin", 0.5)
```

To create a sell transaction with no notes:

```python
transaction = create_transaction("bitcoin", 0.25, False)
```

To create a sell transaction with notes:

```python
transaction = create_transaction("bitcoin", 0.25, False, "Selling one quarter bitcoin")
```

The last combination, creating a buy transaction with notes requires a little bit different syntax.  In the function call, we must explicitly assign the notes using a keyword argument.

```python
transaction = create_transaction("bitcoin", 0.5, notes="Buying one half a bitcoin")
```

If we left out the `notes` keyword argument, the function would think we were attempting to pass `"Buying one half a bitcoin"` to the `buy` parameter.  You can actually use keyword arguments to pass the values to the parameters in any order.

```python
transaction = create_transaction(amount=0.5, buy=True, notes="Buying one half a bitcoin", coin="bitcoin")
```

