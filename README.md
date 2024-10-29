# Introduction To Web Security

This workshop will help you understand how to think about security when building kick-ass stuff that runs on the internet.

## [Open presentation slides](https://docs.google.com/presentation/d/1N816Hg2svQbxxzO6xZRlfToicIiLaRRx9rJ7xyTHvAc/edit?usp=sharing)

## Focus of this lesson

The purpose of this lesson is to give you an brief input into how you should think about security when developing your own stuff. We have prepared a vulnerable web application which you will run on your own PC. Through the various exercises we will go through many of the top web security problems and demonstrate each problem in our vulnerable application.

## What you need

- Browser: [Chrome](https://www.google.com/chrome)
- Code editor: [Visual Studio Code](https://code.visualstudio.com)

## Prerequisites

- Some knowledge about web app development and basic web technologies like HTML and HTTP is helpful

## How to get started

- Start by cloning this repository into a folder on your computer. If you've never used git before, you can alternatively use the "Download ZIP" button to the right.
- Although you have this README file on your computer it's easier to read it on GitHub, so we recommend you keep this page open with the exercise tasks.

## About the vulnerable application

**This is an application that is written with the worst possible practices. Do not use anything here as an example for anything.**

You can assume that you have access to the application source code, but not its data when you are exploiting the vulnerabilities.

You might find vulnerabilities that are not specified. Feel free to be creative in your exploitive adventures.

## Exercises

This repository contains a set of exercises organized in folders. Each folder contains a `README.md` describing the exercise.

- [Exercise 1](exercise-1/) - Up and running
- [Exercise 2](exercise-2/) - Injection - Reflected XSS
- [Exercise 3](exercise-3/) - Injection - SQL Injection
- [Exercise 4](exercise-4/) - Injection - Persisted XSS
- [Exercise 5](exercise-5/) - Parameter tampering with XSS
- [Exercise 6](exercise-6/) - Injection - SQL Injection continued
- [Exercise 7](exercise-7/) - Bonus exercises

### Symbols and notation used in exercises

#### Icons with special meaning

:pencil2: - A task you should do  
:book: - A section of text to read (no tasks, just information).  
:bulb: - Additional information.  
:exclamation: - Something important.  
:question: - Open-ended question for the reader ("What do you think would happen if...")  
:poop: - Bad practice (don't-do-this)  
:star: - A bonus task (not required)  

#### Keyboard keys

Will look like this:

<kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>C</kbd>

#### Diff blocks

Emphasizes how lines of text should change.

```diff
- this text was removed
+ and replaced with this text

