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

The Peewee ORM includes a class named `Model`. All model classes that are mapped to database tables must eventually, inherit, or derirve from the `Model` class. When a class inherits another class, it takes on the fields and methods of that class. This allows us to take advantage of the functionality of the `Model` class without having to write it ourselves for each model class.

Before creating a model class we need to install the `peewee` package. At the command line, run

```bash
pip install peewee
```

Then import the `Model` class from the `peewee` module.

```python
from peewee import Model
```

We can use the `Model` class from Peewee to define the `CryptoTransaction` model class.

```python
class CryptoTransaction(Model):
```

By putting the `Model` class in parentheses we are telling Python that `CryptoTransaction` inherits the `Model` class.

Now for each column add a field to the class and initialize it with a field class from the `peewee` module.

```python
import datetime
from peewee import TextField, FloatField, BooleanField, DateField

class CryptoTransaction(Model):
    coin = TextField()
    amount =  FloatField()
    buy = BooleanField(default=True)
    timestamp = DateField(default=datetime.date.today)
    notes = TextField(null=True)
```

The `default` keyword argument set the default value of the `buy` field to `True` and the default value of the `timestamp` field to the return value of the `datetime.date.today` function. Recall that in the previous module the notes were optional. In a database, we would say the value in nullable. To tell Peewee the notes call be nullable, set the `null` keyword argument to `True`.

## Configuring Peewee

We'll be use SQLite which is a database stored in a local file. The Peewee ORM connects to the database with the `SqliteDatabase` class in the `peewee` module. The `SqliteDatabase` initializer accepts the name of the database file.

```python
from peewee import SqliteDatabase

db = SqliteDatabase("portfolio.db")
```

Now we need to associate the `SqliteDatabase` instance with the `CryptoTransaction` model class. Add an inner class to the `CryptoTransaction` class named `Meta` with a single field `database` and assign it the `db` connection.

```python
class CryptoTransaction(Model):
    # fields
    class Meta:
        database = db
```

Call the `connect` method to open the connection.

```python
db.connect()
```

The database is empty. Tell Peewee to add a table to the database for the `CryptoTransaction` model class by passing it to the `create_tables` method.

```python
db.create_tables([CryptoTransaction])
```

The `create_tables` method accepts a list because in a more complex application there might be multiple tables you want to create.

## Inserting Objects Into the Database

The easiest way to insert an object with the Peewee ORM is with the `create` method on the `CryptoTransaction` model class. This is a function inherited by from the `Model` class in the `peewee` module. The `create` method accepts a keyword argument for each field in the `CryptoTransaction` class.

```python
CryptoTransaction.create(coin="bitcoin", amount=0.5, notes="Initial purchase")
CryptoTransaction.create(coin="ethereum", amount=1.1)
CryptoTransaction.create(coin="bitcoin", amount=0.25, buy=False)
```

The `create` method will create a new instance of the `CryptoTransaction` class with the values assigned to the keyword arguments. It will also insert the instance into the database.
