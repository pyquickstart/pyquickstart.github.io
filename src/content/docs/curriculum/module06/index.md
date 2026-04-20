---
title: Retrieving Data from the Web
description: Use the `requests` package to get coin prices from CoinGecko
---

# Retrieving Data from CoinGecko

Our cryptocurrency portfolio manager has one major omission. There is no way to evaluate the value of the portfolio. Cryptocurrency prices are constantly changing so we need to be able to retrieve current values. CoinGecko is a company that provides such data, and you can get started for free!

> **Note**
>
> You will need a CoinGecko API key to authenticate yourself. Follow the [instructions](https://support.coingecko.com/hc/en-us/articles/21880397454233-User-Guide-How-to-sign-up-for-CoinGecko-Demo-API-and-generate-an-API-key) to register and generate a key. Again, this is completely free and no payment method is required.

## API Key Security

Your API key is like a password, so it needs to be stored securely. In production this would use a cloud service such as Azure Key Vault, or an environment variable. For local development, we can use the `python-dotenv` package to read values from a file and create environment variables from them.

First install the `python-dotenv` package.

```bash
pip install python-dotenv
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

To retrieve the prices, you'll make an HTTP request to a CoinGecko API endpoint. One of the most popular Python packages, `requests`, promotes itself as "HTTP for Humans" meaning it makes handling HTTP traffic and data simple. Often it's just a few lines of code.
