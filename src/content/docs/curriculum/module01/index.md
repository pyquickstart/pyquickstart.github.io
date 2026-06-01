---
title: Onboarding
description: Configuring GitHub Codespaces as the development environment
---

## GitHub Codespaces

> **Note**
>
> This module explains how to configure a development environment using GitHub Codespaces. GitHub Codespaces is an online development that you can use for up to 60 hours per month at no cost. However, if you have an development environment set up using Visual Studio Code, PyCharm or any other toolchain, feel free to skip to the next module.

Choosing a development environment for a workshop such as this can be difficult as everyone has their preferences. And it's impossible to please all of the people all of the time.  However, I believe that Visual Studio Code offers a unique advantage in that the base application, the installer you download from [https://code.visualstudio.com](https://code.visualstudio.com), is unopinionated.  Out of the box, it is so unopinionated, that it's really boring.  This is good because the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/vscode) offers tens of thousands of extension that allow you to transform the editor to fit into almost any workflow you have.

The only potential complication is installation.  Visual Studio Code is open source, free to use and cross-platform, running equally well on Windows, macOS and Linux.  And while this is not a complaint, the cross-platform nature does introduce extra complexity when discussing installation and setup.  Then there are those with security restrictions on their machines and network to further get in the way of the process of writing that first line of Python code.

The solution I have selected for this working is called **GitHub Codespaces**.  Visual Studio Code is not a .NET or C++ application.  Instead, it is written in TypeScript and runs on the Electron application shell.  Thus, Visual Studio Code uses many of the same web technologies on the desktop that a web application would use in a browser.  And that's what GitHub Codespaces is, Visual Studio Code running in the browser.  No downloads, no installations, just go to the GitHub Codespaces home page (we'll do that in a minute) and start developing your Python application.

Actually, Visual Studio Code running in the browser is half of the solution.  The rest is a small Linux compute instance that allows you to not only develop applications, but run them, along with assets and utilities, in the browser as well.  You can run unit tests, spin up Docker containers, connect to databases and manage Azure resources all from a GitHub Codespace.
