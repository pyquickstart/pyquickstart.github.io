---
title: Python Basics
description: All about data types
---

## Python Data Types
Python is a dynamically typed programming language.  Whereas statically typed programming languages such as C# and Java might require type specifiers

```java
int i = 42;
String message = "Hello world!";
```

Python infers the type of a variable from the type of the values assigned to it

```python
i = 42
message = "Hello world!"
```

Thus the variable `i` would be an integer (or `int` in Python) because the value assigned to `i`, 42, is an integer.  And since `"Hello world!"` is a string (or `str` in Python) the variable `message` is also a string.

> Note that like JavaScript, Python strings can be single or double quoted.  This course will use double quotes a majority of the time.

With this in mind let's think about what data we would need to describe a cryptocurrency transaction.  First, we'll need the name of the coin. This would be a string.

```python
coin = "bitcoin"
```

We also need the amount of the coin being bought or sold.  Since you can buy fractions of a coin, we'll use a floating point number.

```python
amount = 0.5
```

There is no way to know if this transaction is for a buy or a sell.  There are several ways to do this.  Since there are only two possible values, buy or sell, we can use the boolean type.  The `buy` variables will be `True` if the transaction is a buy, and `False` for a sell.

```python
buy = True
```

> Note that the built-in Python values `True` and `False` are capitalized.

The timestamp of the transaction should also be recorded.  For simplicity, we'll only record the date.  This could be done with three integers, one each for the year, month and day.

```python
year = 2026
month = 2
day = 20
```

## The Python Standard Library

Now this technically isn't wrong, but there are better mechanisms.  Using three separate values would make it difficult to compare dates.  And we will also want to render them as strings like "Feb. 20, 2026".  For this, we can turn to the Python standard library.  The Python language includes types for primitive values such as strings and integers.  The Python standard library is a collection of modules including functionality that is often used in Python development, but not often enough to be part of the core language.  It is distributed with the Python language so you can be sure of its availability.  In other words, when you install Python, you get the Python standard library without any addition installations.  The Python standard library includes the `datetime` module for working with dates and times.

```python
import datetime
```

The `import` keyword makes the members of the `datetime` module available for use.  An instance of the `date` type can be created by providing integers for the year, month and day.

```python
timestamp = datetime.date(2026, 2, 20)
```

The `date` type also allows you to compare two dates with comparison operators.  It has methods to render a date as a string and to parse a date from a string.  We'll see some of these next.

## Displaying Data

We now have enough data to represent a cryptocurrency transaction.  Let's see how to display it to the user.

To get started, we will use the built-in `print` fucntion.
