---
title: Collection Types
description: Creating and using dictionaries and lists.
---

## Dictionaries

Right now we have enough data to represent a cryptocurrency transaction stored in four variables. But what happens when we want to add another transaction? We can't reuse the variables because the current value will be lost. And adding four variables for each transacation will soon become a burden. Instead, we need a container for the four values. Every time we add a transaction, we create another container.

The container that we will use is called a dictionary, or `dict` in Python. A Python dictionary is a collection of key value pairs. The key and value are separated by a colon, the pairs are separated by commas, and the whole thing is wrapped in curly braces. Here is a dictionary that represents the transaction from the previous module.

```python
transaction = {
    "coin": "bitcoin",
    "amount": 0.5,
    "buy": True,
    "timestamp": datetime.date(2026, 2, 20),
}
```

The dictionary is referred to as a colletion type because it contains a collection of values.

Now if we want to add another transaction, we create another dictionary.

```python
transaction_2 = {
    "coin": "ethereum",
    "amount": 1.1,
    "buy": True,
    "timestamp": datetime.date(2026, 2, 21),
}
```

## Keys

To retrieve a value within a dictionary, pass the value's key in square brackets.

```python
print(f"{transaction['amount']} of {transaction['coin']}")  # 0.5 of bitcoin
```

You can also update a value by assigning a new value to its key.

```python
transaction["amount"] = 0.6
```

And you can dynamically add new keys.

```python
transaction["notes"] = "A transaction for a Bitcoin purchase"
```

Removing a key is done with the `del` keyword.

```python
del transaction["notes"]
```

Attempting to access a key that does not exist will raise an exception.

```python
print(transaction["notes"])     # raises KeyError
```

To avoid this, check if the key exists using the `in` keyword

```python
notes_exist = "notes" in transaction    # False
```

Combined with an if statement, you can avoid the `KeyError`:

```python
if "notes" in transaction:
    print(transaction["notes"])
else:
    print("The transaction has no notes")
```

## Lists

The next piece of the puzzle is how to save all of the transactions in one place. Having variables for each transaction scattered through the application is goingto make them hard to find. Python has another collection type, called the `list` that can be used to keep all the transactions together.

A Python list is merely a linear collection of valid Python values. The values are separated by commas. The list is surrounded by square brackets.

```python
transactions = [transaction, transaction_2]
```

But a Python list is _mutable_ meaning its contents can change. Thus we can add (and remove) values from the list. The `append` method is passed a Python value which is then added to the end of the list.

```python
transaction_3 = {
    "coin": "bitcoin",
    "amount": 0.25,
    "timestamp": datetime.date(2026, 2, 22),
    "buy": False # sell
}

transactions.append(transaction_3)
```

To access a value within a list, pass a numeric, zero-based index in square brackets.

```python
first_transaction = transactions[0]
second_transaction = transactions[1]
```

Attempting to access an index that is out of bounds will result in an `IndexError`. The built-in `len` function will return the number of values in a `list` (or and other collection type) passed to it. If the index is less than the length of the `list` you can avoid the `IndexError`.

```python
if 1 < len(transactions):
    transaction = transactions[1]
    print(transaction["coin"])
else:
    print("Transaction not found")
```

## Exception Handling

There is a better way to avoid the `IndexError`. Instead of checking that the index is in bounds of the list, you can handle the exception in a `try`-`except` block.

In the body of the `try` block, you put the code you want to execute. Then in the `except` block you put the code to run if an exception is raised.

```python
try:
    transaction = transactions[1]
    print(transaction["coin"])
except IndexError:
    print("Transaction not found")
```

Notice the `except` block is only executed if an `IndexError` is raised. You could also handle the `KeyError` when accessing a non-existent key in a similar manner.

```python
try:
    print(transaction["notes"])
except KeyError:
    print("Transaction has no notes")
```

But in this case, I don't think handling an exception is appropriate. The notes for a transaction may be optional and therefore omitting notes is not really an error. It would be more appropriate to check if the transaction dictionary has a `notes` key. If it does, print them and otherwise indicate the transaction has no notes.

> Note: In Python, most exception types are named with the `Error` suffix. But they all derive from the base `Exception` class.

## Loops

The types of the values in the list do not have to be the same. Remember Python is dynamically typed. However, for a list, the values will usually be of the same of at least related types. The reason is you will often iterate over a list using a loop with the `for` keyword. A for loop in Python works a little different than the for-next loop you might see in languages like Java. Instead of iterating over a range of values and using them to index into the list, you iterate over the list and are returned the next value for each loop iteration.

```python
for transaction in transactions:
    print(transaction["coin"])
```

Like the conditional `if` statement, the `for` loop terminates with a colon and the next line is indented to indicate the start of the body to execute on each iteration.

Now you can see why lists will usually be of similar type or structure. We want to be sure that there is a 'coin' key to access. However, as mentioned earlier, a transaction can have optional notes. In this case, simply use a conditional to check if the 'notes' key exists.

```python
for transaction in transactions:
    formatted_timestamp = transaction["timestamp"].strftime("%b. %e, %Y")
    coin = transaction["coin"]
    amount = transaction["amount"]
    action = "Bought" if transaction["buy"] else "Sold"
    notes = transaction["notes"] if "notes" in transaction else "No notes found"

    print(f"Transaction on {formatted_timestamp}")
    print(f"{action} {amount} of {coin}")
    print(f"Notes: {notes}")
```

If you wanted to use the same code for display a particular transaction, it would be appropriate to do so in a `try`-`except` block to handle the `IndexError`. Attempting to access an index out of bounds is an error.

```python
try:
    transaction = transactions[1]
    formatted_timestamp = transaction["timestamp"].strftime("%b. %e, %Y")
    coin = transaction["coin"]
    amount = transaction["amount"]
    action = "Bought" if transaction["buy"] else "Sold"
    notes = transaction["notes"] if "notes" in transaction else "No notes found"

    print(f"Transaction on {formatted_timestamp}")
    print(f"{action} {amount} of {coin}")
    print(f"Notes: {notes}")
except IndexError:
    print("Transaction not found")
```
