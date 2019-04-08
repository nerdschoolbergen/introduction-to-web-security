# Web Security - Mindset, tooling and common vulnerabilities

This brand new workshop will help you understand how to think about security when building kick-ass stuff that runs on the internet.
You will set up an intercepting proxy and explore a few common vulnerabilities using OWASPs WebGoat. 
No prior knowledge is required, just bring a laptop with Java runtime installed and available to use in a terminal (it's on your PATH).


## [Open presentation slides](https://docs.google.com/presentation/d/1rSuQL1vyWFWkWpwQpmb5FD9LLpBc3is9YkU4krWsxiY/edit?usp=sharing)

## Focus of this lesson
The purpose of this lesson is to give you an brief input into how you should think about security when developing your own stuff, as well as help you set up a small toolchain for intercepting and manipulating traffic between a client and your serverside. This will both help you understand how your application works, as well as test it using an intercepting proxy. To do this we will use WebGoat from OWASP to find and exploit some simple vulnerabilities. 
## What you need
- Firefox
- An intercepting web proxy - burpsuite supported - https://portswigger.net/burp/communitydownload 
- OWASP WebGoat - https://github.com/WebGoat/WebGoat/releases ( we will be using 7.1 https://github.com/WebGoat/WebGoat/releases/download/7.1/webgoat-container-7.1-exec.jar ) 

## How to get started
- Download and install firefor 
- Download burpsuite
- Download the webgoat .jar file 


## Webgoat 
open a command window, go to your download folder and run: 
```java -jar .\webgoat-container-7.1-exec.jar```

WebGoat should now be up and running in a container -  browse to:
```http://localhost:8080/WebGoat/start.mvc``` to make sure everything is up and running. 


## Burpsuite 

Download your flavor of burp ( standalone or jar ) if jar, run it `:
``java -jar .\burpsuite_community_1.7.33.jar``

Read and accept eula, press next because temp is just fine, press start burp. 
Follow the slides and configure burpsuite to run a proxy on port 8585. ( Proxy->Options->highlight 127.0.0.1, press edit and change bind to port from 8080 to 8585)

##FireFox
F the slides and set up firefox to connect to the internet trough your proxy.


## Exercises
Most of the exercises are pretty well defined / explained in the lecture slides and in webgoat itself, so this is mostly done for completeness. 
But a brief description is given in the readme.md files of the folders in this repo. 

- [Exercise 1](exercise-1/) <- Http basics
- [Exercise 2](exercise-2/) <- Reflexted XSS
- [Exercise 3](exercise-3/) <- Stored XSS
- [Exercise 4](exercise-4/) <- HttpOnly
- [Exercise 5](exercise-5/) <- Exploiting Hidden Fields
- [Exercise 6](exercise-6/) <- Exploit unchecked mail

## Helpful resources
https://www.owasp.org/index.php/WebGoat_User_Guide_Introduction

