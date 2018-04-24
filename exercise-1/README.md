# Exercise 1 - WebGoat general 

Browse to http://localhost:8080/WebGoat/login.mvc and login using guest/guest

On the left-hand menu press general and then "http-basics". This gives you a form that you can input text and submit. Try to input your name and press go!. Now in burpsuite try to intercept the request and tamper with the parameters before.

Hint: if you tamper with the "Go!" parameter and change it to something else you should suddenly se a green checkbox to the left - indicating that you passed the exercise.

The entire point of this is to get to know the tool and how http-works. We can see cookies, http-headers and request/response bodies.