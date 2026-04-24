---
title: Retrieving Data from CoinGecko
description: Use the `requests` package to get coin prices from CoinGecko
---

Our cryptocurrency portfolio manager has one major omission. There is no way to evaluate the value of the portfolio. Cryptocurrency prices are constantly changing so we need to be able to retrieve current values. CoinGecko is a company that provides such data, and you can get started for free!

> **Note**
>
> You will need a CoinGecko API key to authenticate yourself. Follow the [instructions](https://support.coingecko.com/hc/en-us/articles/21880397454233-User-Guide-How-to-sign-up-for-CoinGecko-Demo-API-and-generate-an-API-key) to register and generate a key. Again, this is completely free and no payment method is required.

## API Key Security

Your API key is like a password, so it needs to be stored securely. In production this would use a cloud service such as Azure Key Vault, or an environment variable. For local development, we can use the `python-dotenv` package to read values from a file and create environment variables from them.

First install the `python-dotenv` package.

```bash
$ pip install python-dotenv
```

In the code, add two `import` statements. The first one imports a function from the `dotenv` module to load the values from a file.

```python
from dotenv import load_dotenv
```

The second is the `os` module from the Python standard library. Using the `os` module we can easily access environment variables. But first, we need to create the file to store the variables. By default the file is called `.env`. Put one variable on each line as a key/value pair, separated by an equals sign.

```
COINGECKO_API_KEY="{your_api_key_here}"
```

In the code, call the `load_dotenv` function to load the environment variables from the `.env` file. Then use the `getenv` function from the `os` module to retrieve the value of the `COINGECKO_API_KEY` variable.

```python
load_dotenv()

coingecko_api_key = os.getenv("COINGECKO_API_KEY")
```

As a sanity check, you can display the last four characters of the key. If you do this, make sure to remove it right away as this is not a good practice.

```python
print(coingecko_api_key[-4:])
```

## Making HTTP Requests

To retrieve the prices, you'll make an HTTP request to a CoinGecko API endpoint. One of the most popular Python packages, `requests`, promotes itself as "HTTP for Humans" meaning it makes handling HTTP traffic and data simple. Often it's just a few lines of code. First, install the `requests` package.

```bash
$ pip install requests
```

Next, import the `requests` module in the code.

```python
import requests
```

The CoinGecko API endpoint to retrieve the price of a coin is: `https://api.coingecko.com/api/v3/simple/price`. The endpoint expects three key/value pairs in the query string:

- `vs_currencies` - A comma separated list of abbreviated currencies (ie. 'USD' for US dollars) to convert the price
- `ids` - A comma separated list of coins (ie. 'bitcoin')
- `x_cg_demo_api_key` - The CoinGecko API you created and store in an environment variable

Using a f-string, it's easy to construct an endpoint to get the price of Bitcoin in US dollars.

```python
currency = "USD"
coin = "bitcoin"
url = f"https://api.coingecko.com/api/v3/simple/price?vs_currencies={currency}&ids={coin}&x_cg_demo_api_key={coingecko_api_key}"
```

To get the data back from the API, make an HTTP GET request by passing the `url` to the `get` function in the `requests` module. This returns an object for the HTTP response. Check the response `status_code`. If it's 200 then the request succeeded. The CoinGecko API will return the data in JSON format. For the `url` we created, the JSON would look like this (the actual price will vary)

```json
{ "bitcoin": { "usd": 75438 } }
```

You could use the `json` module in the Python standard library to parse the JSON into a Python dictionary. However, the response object will do it for you by calling the `json` method. Then you can drill down to the price with the `bitcoin` and `usd` keys.

```python
response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    price = data["bitcoin"]["usd"]
    print(f"The current price of {coin.capitalize()} is {price} {currency}")
else:
    print("Could not get any data.")
```

The demo API is restricted in the number of total requests per month (10K) and the number of requests per minute (30). To stay within these limits, it can be helpful to query the API for multiple keys and/or currencies in one request. this is done by passing `vs_currencies` and/or `ids` a comma separated list. The Python string has a `join` method that accepts a Python `list` returning a string of the values in the list, separated by the string `join` was called on. This makes it simple to construct comma separated lists for the CoinGecko API.

```python
coins = ["bitcoin", "ethereum"]
currencies = ["USD", "GBP"]
base_url = "https://api.coingecko.com/api/v3/simple/price"
qs = f"?vs_currencies={','.join(currencies)}&ids={','.join(coins)}&x_cg_demo_api_key={coingecko_api_key}"
response = requests.get(base_url + qs)  # the '+' operator concatenates two strings
```

The JSON for this requests looks like

```json
{
  "bitcoin": {
    "usd": 75387,
    "gbp": 55683
  },
  "ethereum": {
    "usd": 2304.97,
    "gbp": 1702.52
  }
}
```

The JSON object includes a key for each coin. The value for each coin is another JSON object with a key for each currency. The `json` method of the response object returns this data in a Python dictionary. Drill down into the keys to get the values needed.

```python
if response.status_code == 200:
    data = response.json()
    for coin in data.keys():  # the keys of the response JSON are the coins
        for currency in data[
            coin
        ].keys():  # each coin key has a JSON object with the currencies as keys
            price = data[coin][currency]
            print(
                f"The current price of {coin.capitalize()} in {currency.upper()} is {price}"
            )
else:
    print("Could not get any data.")
```

## Getting the Portfolio Value

In the previous module, you saw how to store transactions in a SQLite database with the PeeWee ORM in the `peewee` package. Recalling that knowledge, assume we have the following transactions:

```python
CryptoTransaction.create(coin="bitcoin", amount=0.5, notes="Initial purchase")
CryptoTransaction.create(coin="ethereum", amount=1.1)
CryptoTransaction.create(coin="bitcoin", amount=0.25, buy=False)
```

This code represents:

- A **buy** of **0.5** **Bitcoin**
- A **buy** of **1.1** **Ethereum**
- A **sell** of **0.25** **Bitcoin**

The total amounts of the portfolio should be:

- 0.25 Bitcoin
- 1.1 Ethereum

We can get all of the transactions in the database, and iterate over them:

```python
for transaction in CryptoTransaction.select():
    # get amounts
```

Using the `Counter` class from the `collections` module in the Python standard library, we can keep track of the total amounts in the portfolio:

```python
from collections import Counter

coin_counts = Counter()

for transaction in CryptoTransaction.select():
    if transaction.buy == True:
        coin_counts[transaction.coin] += transaction.amount
    else:
        coin_counts[transaction.coin] -= transaction.amount
```

The `Counter` class is like a dictionary except accessing a non-existent key will not raise a `KeyError`. Instead, it will add the key to the `Counter`. Since we are only interested in the final totals, the order of the transactions is not important for this case.

Iterate over the `coin_counts` and query CoinGecko for the price of each coin and multiply it by the amount.

```python
for coin, amount in coin_amounts.items():
    response = requests.get(f"https://api.coingecko.com/api/v3/simple/price?vs_currencies={currency}&ids={coin}&x_cg_demo_api_key={coingecko_api_key}")
    data = response.json()
    price = data[coin][currency]
    value = amount * price
    print(f"\t{amount} {coin.capitalize()}, Current Value: {value:.2f} {currency.upper()}")
```

The output will look something like this: (values will vary)

```
Current Portfolio:
        0.25 Bitcoin, Current Value: 19572.50 USD
        1.1 Ethereum, Current Value: 2568.56 USD
```
