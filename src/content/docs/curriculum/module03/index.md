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

Now if we want to add another transaction, we create another dictionary.

```python
transaction_2 = {
    "coin": "ethereum",
    "amount": 1.1,
    "buy": True,
    "timestamp": datetime.date(2026, 21, 2),
}
```
