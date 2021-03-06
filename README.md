# Personal Contact Manager

<b>Members</b>: Haerunnisa Dewindita, Huy Dang, John Albury, Alana Arjune, Joshua Sylvestre, Subhash Naidu, and Abdulfattah Isleem

This program is a personal contact manager created for Richard Leinecker's Spring 2018 COP4331C class. It supports encyrpted logins for each user, contact lookup, deletion and insertion!

This project utilizes the MEAN stack: MongoDB, Express, AngularJS, and NodeJS, where our MongoDB cluster is remotely held.

## Run the Project!
To run the project, you have to first clone it:
```
$ git clone https://github.com/JoshuaSylvestre/Personal-Contact-Manager.git
```

After cloning, make sure you have the components of the MEAN stack supported on your machine.
> ### MacOS MEAN Installation
> 
> Use Homebrew to install `mongodb` and Node, which will come with `npm`:
> ```
> $ brew install mongodb
> $ brew install node
> ```
>
> Then, use `npm` to download the rest of the components of the stack!
> ```
> $ npm install express
> $ npm install -g @angular/cli
> ```
>
> ### Windows MEAN Installation
> ~ Download and run the installer for MongoDB, Node,js from the following links:
> ```
> MongoDB: https://www.mongodb.com/download-center#compass
> Node.js: https://nodejs.org/en/download/
> ```
> Then, use `npm` in PowerShell to download the rest of the components of the stack!
> ```
> $ npm install express
> $ npm install -g @angular/cli
> ```

Make sure you are in the freshly-cloned git repository and move to the project directory.
```
$ cd personal-contact-manager
```

Finally, run the project!
```
$ npm start
```
If all is successful, the contact manager should be available at your `localhost` on `port 3000` (`http://localhost:3000/`).

Or, you can visit the hosted website: https://personal-contact-manager.herokuapp.com/
