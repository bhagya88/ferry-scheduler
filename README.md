# Ferry Scheduler

### Overview
Ferry Schedular is full stack application which hosts live arrival-departure information of ferries. It also lets user to manipulate this inforamtion and also add new ferries, for the purpose of administraion. 

### Demo
[Click to see the demo](https://fierce-hollows-12042.herokuapp.com)

### Tecnologies used
* Datebase: Firebase
* JQuery, Javascript
* HTML5, CSS3, Bootstrap

### Challenges faced
* How to let users logged in from different machines view same data?
 
### Solutions found
* Using on child added, child changed and child removed  listeners for the database solved the problem.

### How it works
* When you enter the page, it displays the current ferry schedule.
* When user enter a new ferry, it gets added to the list. This new ferry will be automatically visible to all users with out page refresh.
* Also when the user makes updates or deletes a ferry, this gets saved to the database and will be visible across all users.


##### Developed by Bhagya
