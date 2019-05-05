# Web Security - Mindset, tooling and common vulnerabilities

This brand new workshop will help you understand how to think about security when building kick-ass stuff that runs on the internet.
You will set up an intercepting proxy and explore a few common vulnerabilities using Troy Hunt's "Hack yourself first"-site.

## [Open presentation slides](https://docs.google.com/presentation/d/1rSuQL1vyWFWkWpwQpmb5FD9LLpBc3is9YkU4krWsxiY/edit?usp=sharing)

## Focus of this lesson
The purpose of this lesson is to give you an brief input into how you should think about security when developing your own stuff, as well as help you set up a small toolchain for intercepting and manipulating traffic between a client and your serverside. This will both help you understand how your application works, as well as test it using an intercepting proxy. To do this we will use the "Hack yourself first"-site.

## What you need
- A browser - E.g. Firefox or Chrome
- An intercepting web proxy - Fiddler, Burp or Charles.

## Exercises

- [Exercise 1](exercise-1/) - Client-side validation
- [Exercise 2](exercise-2/) - Reflected XSS
- [Exercise 3](exercise-3/) - Parameter tampering
- [Exercise 4](exercise-4/) - SQL Injection
- [Exercise 5](exercise-5/) - Tampering and more SQL injection
- [Bonus exercise 1](exercise-6/) - Cross site request forgery
- [Bonus exercise 2](exercise-7/) - Content Security Policy

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