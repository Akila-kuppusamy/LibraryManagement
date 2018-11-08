Library Management Case study

	This is a POC for Library Management Application with Spring Boot ,Data REST backend and React.js frontend. Application uses H2 runtime database and contains demodata.

Stack

  H2
  JPA
  REST
  React.js

Local environment setup

1)Install Java 1.8

2)Install IDE (Spring Tool Suite) 

Launching the Application

Launch by typing: mvnw spring-boot:run

URL to hit : http://localhost:8080

REST Calls

http://localhost:8080/api/books
http://localhost:8080/api/customers
http://localhost:8080/api/authors
http://localhost:8080/api/issues


Modules:

Library management consists of 4 modules.
1) Book module give the details about book information like book name,author and isbn.

2) Author module gives the details about author name,country and publication

3) Customer module consists of customer info like first name,last name and email address.

4) Issue moduls give the information about issues of the book to the customer.
