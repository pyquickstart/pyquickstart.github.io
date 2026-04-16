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
    "timestamp": datetime.date(2026, 20, 2),
}
```

The dictionary is referred to as a colletion type because it contains a collection of values.

Now if we want to add another transaction, we create another dictionary.

```python
transaction_2 = {
    "coin": "ethereum",
    "amount": 1.1,
    "buy": True,
    "timestamp": datetime.date(2026, 21, 2),
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
