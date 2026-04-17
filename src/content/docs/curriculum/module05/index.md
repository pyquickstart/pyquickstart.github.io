---
title: Databases
description: Store transactions in a SQLite database using the Peewee ORM
---

## Object Oriented Programming

Before proceeding we need to talk a little about object oriented programming. You've been using a Python dictionary to group the data needed to represent a cryptocurrency transaction. And that's fine, but you've also had to write functions to create a new transaction and to display a transaction. Python has another construct you can use, to accomplish the same outcome.

A _class_ is a grouping of data and related functionality. The data are _fields_ and the functionality is defined with _methods_. A field is similar to a variable that belongs to a class and a method is similar to a function that belongs to a class. Here is a class for a cryptocurrency transaction.

```python
class CryptoTransaction:
    def __init__(self, coin, amount, buy=True):
        self.coin = coin
        self.amount = amount
        self.buy = buy

    def __str__(self):
        return f"<CryptoTransaction {self.coin} | {self.amount} | {'buy' if self.buy else 'sell'}>"
```

This defines a class `CryptoTransaction` with two methods `__init__` and `__str__`. These are called "dunder" methods because they are preceded with a double underscore. "Dunder" is short for "double underscore". The `__init__` method is called the _initializer_ and is called when a instance of the class is created. An instance of a class contains unique values for each field in the class. Here those fields are `coin`, `amount`, and `buy`. These are passed as parameters to the initializer.

Notice the first parameter to the initializer, `self`. This represents the current instance of the class. The body of the initializer assigns the values of the parameters to the values of the fields in the instance. The dot accesses the field. The initializer implicitly returns the instance.

The `__str__` method also accepts a parameter for the current instance of the class. It returns a string representation of the current instance. This method is called when you pass an instance to a method like `print`. Notice how the fields are accessed in the f-string with the dot syntax.

Here is how to call the initializer.

```python
transaction = CryptoTransaction("bitcoin", 0.5)
```

This will return an instance of `CryptoTransaction` with the `coin` field set to `"bitcoin"`, the `amount` field set to `0.5` and the `buy` field set to the default value of `True`. You can access the field values with the dot syntax.

```python
print(transaction.coin)     # bitcoin
print(transaction.amount)   # 0.5
```

The `__str__` method is called when you pass the instance to the `print` function.

```python
print(transaction)  # <CryptoTransaction bitcoin | 0.5 | buy>
```

## Object Relational Mappers

In this module, we will save the transactions to a SQLite database. To make things easier, and more Pythonic, we won't use SQL. Instead we will use an _object relational mapper_ or ORM. And ORM maps the fields in Python classes, called _model classes_, to columns in a relational database table. When retrieving rows from a table, each row is mapped to an instance of a model class. This allows us to circumvent SQL and work only with Python objects.

There are a number of different ORMs that can be used in a Python application. We will use one of the simpler packages, called Peewee.
