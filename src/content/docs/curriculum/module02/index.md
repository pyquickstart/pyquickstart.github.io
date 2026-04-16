---
title: Python Basics
description: All about data types
---

# Python Basics

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
