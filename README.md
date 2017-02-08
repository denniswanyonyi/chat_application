# Chat Application

This chat application is developed using <a href="https://nodejs.org/">Node JS</a>, <a href="http://socket.io/">Socket IO</a> and JavaScript. Currently 
allowes for group chat. An individual enters their username in order to proceed to chat. The username must
be unique for each user.

This application doesn't implement authentication so one can use the several tabs on same browser to chat. 
The aim is to show how easy it is to develop real time messaging  by developing a simple web chat application.

##Installation
In order to run this application on your local environment, make sure you have <a href="https://nodejs.org/">Node JS</a>, <a href="https://npmjs.com/">npm</a> and <a href="https://git-scm.com/">git</a> installed.

Next clone the project to by running the command  
 `git clone https://github.com/denniswanyonyi/chat_application.git`

Next use your terminal to navigate to the project folder `chatio` and run the command `npm install`. This command installs all the dependencies(libraries) required to run the application on your local environment. The dependencies are listed on the `package.json` file.


## Running the application
Once the dependencies are installed, you are ready to run the application locally. On the terminal, navigate to the root folder of the application and run `node server.js` to run the application. Open your web browser and navigate to the url `localhost:2017`. Specify your username to continue to chat. You can open multiple tabs and enter a different username and see chat messages displaying on all the open tabs. Usernames must be unique to every user.


### Conclusion
This prototype has been developed by Dennis Wanyonyi