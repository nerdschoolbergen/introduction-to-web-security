# Exercise 1 - Up and running

In this exercise you will set up the local development environment required for the next exercises.

You will learn to:

- Install the required software
- Set up and run the local development environment

## Before you start

- :pencil2: Start by cloning this repository into a folder on your computer if you haven't done so already. If you've never used git before, you can alternatively use the the "Download ZIP" button to the right.
- :book: Although you have this `README.md` file on your computer, it's easier to read it on GitHub with formatting. We therefore recommend you keep a web browser tab open with the exercise tasks.

## 1.1 Installing software

### 1.1.1 Node.js

:book: Node.js is the platform/runtime that's going to run our web server and backend code. You can test if you already have Node.js installed by opening a terminal and entering `node -v` which should return a version number if it's installed.

:pencil2: If you don't have Node.js installed, you can download the latest LTS (long-term support) release from [nodejs.org](https://nodejs.org/en/).

:exclamation: **Note:** If you have Node installed with a version _less_ than the latest LTS version, please upgrade to the latest LTS version before continuing.

### 1.1.2 Chrome

:pencil2: [Install Google Chrome if you don't have it](https://www.google.com/chrome/browser/desktop/)

## 1.2 Local development environment setup

:pencil2: Open a terminal and change directories to the `vulnerable-application` folder.

:pencil2: Install all [npm](https://npmjs.com) dependencies by running the following command:

```bash
$ npm install
```

:pencil2: Run the following commands to start the web app:

```bash
$ npm run dev
```

:pencil2: Open [http://localhost:3000](http://localhost:3000) in Chrome

:book: You should now see a login prompt saying "Login to vote" on the screen.

:pencil2: To stop the application, press <kbd>CTRL</kbd>+<kbd>C</kbd> while inside the terminal window you started the application in.

:book: If you need to restore the state of the database to its initial state, you can run the command `npm run seed`.
___

Now that we're all set-up, let's try to hack the app!

### [Go to exercise 2 :arrow_right:](../exercise-2/README.md)
