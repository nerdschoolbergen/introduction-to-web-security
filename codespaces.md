# Using GitHub Codespaces with this repository

See [GitHub Codespaces overview](https://docs.github.com/en/codespaces/overview) if you want to learn more about GitHub Codespaces.

## Prerequisites

A personal GitHub account. See [Sign up for a new GitHub](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account) if you don't have an account.

## Read this first

CodeSpaces gives you 60 hours of free use per month for personal GitHub accounts. You will be notified by email when you have used 75%, 90%, and 100% of your included quotas. 

When a personal account has used all of either the included storage or compute usage (whichever is reached first), and has no spending limit configured, use of GitHub Codespaces will be blocked. You must set up a payment method and a spending limit to continue using GitHub Codespaces during the current billing month. 

## Creating your workshop codespace

1. Click on the **Open in GitHub Codespaces** button below:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=master&repo=130809732)

**TODO: Replace URL above with final URL before merging branch!**

2. Click **Create codespace** and wait a minute while the codespace is being set up.

3. A web-based VSCode window will open up, allowing you to remotely access your codespace. 

The codespace comes pre-configured with the following software:
- VSCode
- Node.js
- Git CLI

## Running the application

Once your codespace is created, the workshop repository will be automatically cloned into it. Now you can run the application and launch it in a browser.

1. When the terminal becomes available, cd into the `vulnerable-application` directory and enter the command `npm install`.
2. After the `npm install` command finishes, enter the command `npm run dev` to start the web application.
3. When your application starts, the codespace recognizes the port the application is running on and displays a pop-up message to let you know.
4. Click **Open in Browser** to view your running application in a new tab.

## Making changes

1. Switch back to your codespace change some code.
2. Go back to the running application tab in your browser and refresh to see your changes.
3.  If you've closed the browser tab, click the **Ports** tab in VS Code, hover over the **Local Address** value for the running port, and click the **Open in Browser** icon.
