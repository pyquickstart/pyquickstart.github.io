---
title: CLI Applications
description: Use the `typer` package to create a CLI application with help, commands and options
---

## Typer

So far in this workshop we have built the necessary features of the cryptocurrency portfolio manager. In this module you will put them altogether in a command line interface (or CLI) application.

You can find everything you need in the Python standard library but there are packages in the Python community that have done much of the hard work in advance. The one we will use in this module is called Typer.

To begin, install the `typer` package.

```bash
$ pip install typer
```

In your code, `import` the `typer` module and create an instance of the `Typer` class.

```python
import typer

app = typer.Typer()
```

## Commands

For each action you want to perform with the CLI app, you'll issue a command such as `add` to add and new transaction to the database, or `portfolio` to display the value of your portfolio. Each command is a Python function decorated with the `command()` decorator. A decorator modified the behavior of whatever it decorates. Here we are modifying the behavior of a function so that it is invoked when a particular command is passed to the CLI app.

```python
@app.command("add")
def create_transaction(coin: str, amount: float, buy: bool=True, notes: str=None):
    # body here
```

By default, Typer will assume the name of the command to be the same as that of the function the `command` decorator modifies. However, as is the case here, you can pass a name to the `command` decorator and Typer will use it. Here that command will be `add` even though the `create_transaction` function will be run.

Also, take a look at the parameters to the `create_transacton` function. Each parameter has what is called a type annotation or type hint. This is a suggestion of what the type of each parameter should be. However, the Python interpreter ignores these. You could pass a dictionary as the `amount` and Python will let you do. Your code will likely crash, but Python isn't going to stop you from trying. Instead, type hints are increasingly used by tools and preprocessors to enhance Python development. Typer uses them to check types and make assumptions about the values.

> **Note**
>
> The Python interpreter does not check types at runtime, regardless of whether type hints are included. Also, type hints are not the same as static typing. There are packages, such as Pydantic, that do allow you to check type hints at runtime but you have to wire it up in your application.

A Typer application uses type hints (as the name suggests) to validate types at runtime, generate help, and other purposes. Adding type hints is a good habit to get into.

Inside of the `create_transaction` function, create a new `CryptoTransaction` from the previous modules. Pass the parameters from `create_transaction` to the `create` function of the `CryptoTransaction` class.

```python
@app.command("add")
def create_transaction(coin: str, amount: float, buy: bool=True, notes: str=None):
    CryptoTransaction.create(coin=coin, amount=amount, buy=buy, notes=notes).save()
    typer.echo(f"Added transaction: {'Bought' if buy else 'Sold'} {amount} {coin.capitalize()}")
```

Assuming the code is in a file called manager.py, to add a buy for 0.5 Bitcoin you use this command:

```bash
$ python manager.py add bitcoin 0.5
```

## Options

Now what if you want to add a sell?

```bash
$ python manager.py add bitcoin 0.25 False
```

As the default value of the `buy` parameter is `True` we don't have to pass a value to the command for a buy transaction. This is not the case for a sell and explicitly passing `False` looks a bit awkward.

Since the `buy` parameter is a boolean, we can make it a flag, which is a spin on an option. What we're going to do is create an option for a _sell_ transaction. If the option is omitted, the transaction is a buy and is a sell only if the option is included. This may sound counterintuitive but it's all about making the interface user friendly. To associate a parameter with an option, you're going to use the `Annotated` type from the `typing` module in the Python standard library. Using `Annotated`, you can specify metadata. It's up to the application to decided what to do with that metadata. Here's how the new `create_transaction` function signature looks.

```python
from typing import Annotated

# ...
@app.command("add")
def create_transaction(
    coin: str,
    amount: float
    sell: Annotated[bool, typer.Option("--sell")] = False,
    notes: str = None
):
    # body
```

This tells Typer to pass the `sell` parameter a value of `True` if the `--sell` option is included when invoking the `add` command. However, notice `sell` has a default value of `False`. Thus if the `--sell` option is omitted when invoking the `add` command the `sell` parameter will be `False`.

However, the `CryptoTransaction` class wants a value of `True` to represent a buy. Therefore, we need to pass the inverted value of `sell` to the `create` function of the `CryptoTransaction` class.

```python
def create_transaction(
    coin: str,
    amount: float
    sell: Annotated[bool, typer.Option("--sell")] = False,
    notes: str = None
):
    CryptoTransaction.create(coin=coin, amount=amount, buy=not sell, notes=notes).save()
```

Now the command to add a sell becomes

```bash
$ python manager.py add bitcoin 0.25 --sell
```

The command to add a buy is still the same.

## View the Portfolio

To view the portfolio value, add another function and decorate it with the `command` decorator

```python
@app.command("view")
def view_portfolio(
    currency: Annotated[str, typer.Option("--currency", "-c")] = "usd"
):
    coin_amounts = Counter()

    for transaction in CryptoTransaction.select():
        if transaction.buy:
            coin_amounts[transaction.coin] += transaction.amount
        else:
            coin_amounts[transaction.coin] -= transaction.amount

    typer.echo("Current Portfolio:")
    price_data = get_current_price(list(coin_amounts.keys()), currency)
    for coin in price_data:
        price = price_data[coin][currency]
        amount = coin_amounts[coin]
        value = amount * price
        typer.echo(f"\t{amount} {coin.capitalize()}, Current Value: {value:.2f} {currency.upper()}")
```

Most of this code you saw in the previous module. The big difference is the use of the `typer.Option` for the `currency` parameter. If you omit the `--currency` option or the short `-c` option, Typer will use `usd` as the default. Otherwise you will have to pass a value to the option.

The command to show the portfolio values in Great British Pounds (GBP) looks like:

```bash
$ python manage.py show --currency gbp
```

or

```bash
$ python manage.py show -c gbp
```
