---
title: Formatting Output
description: Organize the application into modules and format the output with the Rich package
---

## Modules

In the previous modules, you've use a number of Python modules. Some have been from the Python standard library while other were from 3rd party packages you installed with `pip`. But you can also make your own modules. You actually already have, and might not even realized it!

Every time you make a Python file, that file can be treated like a module. All you have to do is import a module that is the same name as the file, without the extension. Let's take a closer look.

The code to access the current prices with CoinGecko has no dependencies on the rest of the application code. Therefore, along with its own dependencies, that code can be moved to a different file and thus a different module. Call it `coingecko.py`

```python
# coingecko.py

import os

import requests
from dotenv import load_dotenv

load_dotenv()


def get_current_price(coins, currency="usd"):
    coingecko_api_key = os.getenv("COINGECKO_API_KEY")
    coin_ids = ",".join(coins)
    response = requests.get(
        f"https://api.coingecko.com/api/v3/simple/price?vs_currencies={currency}&ids={coin_ids}&x_cg_demo_api_key={coingecko_api_key}"
    )
    return response.json()
```

This will raise errors in the main file, `manager.py` because the `get_current_price` function is called but no definition can be found. To solve this, import the `get_current_price` function from the `coingecko` module.

```python
# in manager.py
from coingecko import get_current_price
```

You can do the same thing with the database code. Move it into a file called `db.py`.

```python
# db.py

import datetime

from peewee import (
    BooleanField,
    DateField,
    SqliteDatabase,
    Model,
    CharField,
    FloatField,
    TextField,
)

db = SqliteDatabase("module08.sqlite")


class CryptoTransaction(Model):
    coin = CharField()
    amount = FloatField()
    buy = BooleanField(default=True)
    timestamp = DateField(default=datetime.date.today)
    notes = TextField(null=True)

    class Meta:
        database = db


db.connect()
db.create_tables([CryptoTransaction])
```

And in `manaager.py` import the `CryptoTransaction` class from the `db` module.

```python
# in manager.py

from db import CryptoTransaction
```

A word should be said about organization. As a application grows, so will the number of modules used. The Python interpreter does not care what order these are placed in. It only worries about them being referenced. However, for those who might see your code in the future, including yourself, there is a consensus on how to organize module imports in a Python application.

Think of modules in three categories:

- Python standard libary (ie. `datetime`)
- Installed 3rd party modules (ie. `requests`)
- Modules you created (ie. `coingecko`)

The imports should be arranged in that order: Python standard library first, then 3rd party modules and finally those you created for the application. In addition generic module imports such as `import Typer` should be included before more specific imports. The imports for `manager.py` would like like this:

```python
import typer

from collections import Counter
from rich import print
from typing import Annotated

from db import CryptoTransaction
from coingecko import get_current_price
```

There are no imports from the Python standard library after separating the code into modules. If there were it would come before the `import Typer` line.

## Formatting with `rich`

A common issue with CLI applications is the output is .. boring. The lack of style and formatting can also make it difficult to read. By applying color and using ASCII characters to create "widgets" it can make applications much easier and useful. Python apps can leverage the `rich` package to do all of this and more.

First install the `rich` package.

```bash
$ pip install rich
```

The simplest way to format text using `rich` is the `print` function.

```python
from rich import print
```

> **Note**
>
> This will clobber the built-in Python `print` function.  It's usually not a problem as the `rich` `print` function does everything the built-in Python `print` function can.  The `rich` function supports the the `rich` console markup as you'll see next.  You can alias the `rich` function if you really want to keep the two separate.

## Console markup

To add color and style to your CLI application output the `print` function can render console markup.  This is similar to HTML tags except with square brackets instead of angles.  The following code will render the the coin name as blue in the output.

```python
print(f"The current price of [blue]{coin.capitalize()}[/blue] is {price} {currency}")
```

You can also add style.  Let's make the price of the coin bold green.

```python
print(
    f"The current price of [blue]{coin.capitalizer()}[/blue] is [bold green]{price} {currency}[/bold green]"
)
```

You can omit the closing tag and the style will be applied to the rest of the string.  You can also use a single slash to close the tag like this `[blue]Blue Text[/] other color text`

> **Note**
>
> The order of the color and styles is irrevelant.  Instead of `[bold green]` you could have added `[green bold]`.  If you include a closing tag, the order must be the same in both the opening and closing tags.
