---
title: Python Basics
description: All about data types
---

## Python Data Types

Python is a dynamically typed programming language. Whereas statically typed programming languages such as C# and Java might require type specifiers

```java
int i = 42;
String message = "Hello world!";
```

Python infers the type of a variable from the type of the values assigned to it

```python
i = 42
message = "Hello world!"
```

Thus the variable `i` would be an integer (or `int` in Python) because the value assigned to `i`, 42, is an integer. And since `"Hello world!"` is a string (or `str` in Python) the variable `message` is also a string.

> Note that like JavaScript, Python strings can be single or double quoted. This course will use double quotes a majority of the time.

With this in mind let's think about what data we would need to describe a cryptocurrency transaction. First, we'll need the name of the coin. This would be a string.

```python
coin = "bitcoin"
```

We also need the amount of the coin being bought or sold. Since you can buy fractions of a coin, we'll use a floating point number.

```python
amount = 0.5
```

There is no way to know if this transaction is for a buy or a sell. There are several ways to do this. Since there are only two possible values, buy or sell, we can use the boolean type. The `buy` variables will be `True` if the transaction is a buy, and `False` for a sell.

```python
buy = True
```

> Note that the built-in Python values `True` and `False` are capitalized.

The timestamp of the transaction should also be recorded. For simplicity, we'll only record the date. This could be done with three integers, one each for the year, month and day.

```python
year = 2026
month = 2
day = 20
```

## The Python Standard Library

Now this technically isn't wrong, but there are better mechanisms. Using three separate values would make it difficult to compare dates. And we will also want to render them as strings like "Feb. 20, 2026". For this, we can turn to the Python standard library. The Python language includes types for primitive values such as strings and integers. The Python standard library is a collection of modules including functionality that is often used in Python development, but not often enough to be part of the core language. It is distributed with the Python language so you can be sure of its availability. In other words, when you install Python, you get the Python standard library without any addition installations. The Python standard library includes the `datetime` module for working with dates and times.

```python
import datetime
```

The `import` keyword makes the members of the `datetime` module available for use. An instance of the `date` type can be created by providing integers for the year, month and day.

```python
timestamp = datetime.date(2026, 2, 20)
```

The `date` type also allows you to compare two dates with comparison operators. It has methods to render a date as a string and to parse a date from a string. We'll see some of these next.

## Displaying Data

We now have enough data to represent a cryptocurrency transaction. Let's see how to display it to the user.

To get started, we will use the built-in `print` function. `print` accepts a value. The string representation of that value will be displayed in the console. For the primitive data types, the output is predictable.

```python
print(coin)         # bitcoin
print(amount)       # 0.5
print(buy)          # True
```

> Note: A single line comment in Python is preceded with the `#` character

The `date` object is a little different.

```python
print(timestamp)    # 2026-02-20
```

The default string representation of a `date` is the four digit year, a hypen, the zero padded numeric month, another hypen, and the zero padded numeric day. By calling the `strftime` method on the `date` and passing it a format string, you can have precise control over the string representation. For example, this format string `"%b. %e, %Y"` will display the abbreviated month, a period, a space, the numeric day without padding, a comma, a space, and the four digit year.

```python
print(timestamp.strftime("%b. %e, %Y"))     # Feb. 20, 2026
```

Check out [strftime.net](https://strftime.net) or the Python documentation for a complete list of options when formatting dates and times.

## Formatting Strings

Displaying the values by themselves is not enough. You need to add context by embedding the variable values in a string. In Python, you can do this by formatting the string with something known as an 'f-string'. Here is an example.

```python
print(f"Transaction for {amount} {coin} on {timestamp.strftime('%b. %e, %Y')}")
# Transaction for 0.5 bitcoin on Feb. 20, 2026
```

First, it's obviously how the f-string gets its name. The formatted string is prefixed with the letter 'f'. Inside the f-string, Python expressions in curly braces are evaluated and then result inserted into the string. For variables this is the string representation. But you can also call the `strftime` method as well. Notice that the format string passed to `strftime` is single quoted otherwise Python would get confused. You could also have left the format string passed to `strfine` double quoted and single quoted the f-string.

## Conditionals

There one more data point we didn't show in the f-string, the `buy` variable. As a boolean the string representation will be either `True` or `False`. And we can do this.

```python
print(f"{buy} {amount} of {coin} on {timestamp.strftime('%b. %e, %Y')}")
# True 0.5 of bitcoin on Feb. 20, 2026
```

Without context this doesn't make much sense. Instead, we'd like the output to be "Bought" or "Sold" depending on the value of `buy`. We'll need a conditional for this.

```python
if buy == True:
    action = "Bought"
else:
    action = "Sold"
```

The syntax here is the `if` keyword, followed by the condition without parentheses. Then a colon to indicate the next line starts the body if the conditional evaluates to `True`. The body **must** be indented. Indentation determines scope.

> Note: As Python uses indentation to determine scope, it is very picky and expects consistency. Both the size and character used in the indentation should remain constant throughout the code. For example, don't use 2 spaces sometimes and tabs of width 4 in others, even if it looks better. Python will raise exceptions for inconsistent indentation.

Putting this together with the f-string will add context to the `buy` variable.

```python
if buy == True:
    action = "Bought"
else:
    action = "Sold"

print(f"{action} {amount} of {coin} on {timestamp.strftime('%b. %e, %Y')}")
# Bought 0.5 of bitcoin on Feb. 20, 2026
```

> It turns out, you can evaluate the action in a single line expression with a ternary conditional.
>
> ```python
> "Bought" if buy == True else "Sold"
> ```
>
> The ternary conditional can be directly evaluated in the f-string
>
> ```python
> print(f"{'Bought'if buy == True else 'Sold'} {amount} of {coin} on {timestamp.strftime('%b. %e, %Y')}")
> ```
>
> The standard adminition of "With great power comes great responsibility" applies here. Take care not to get too clever and make your code unreadable.
