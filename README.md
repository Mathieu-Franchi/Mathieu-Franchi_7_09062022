# Project 7 openclassrooms
## Groupomania social network 
![icon-left-font-modif](https://user-images.githubusercontent.com/89087885/196002940-0179c633-1b1b-4a95-83cb-4505a6fe5f63.png)

## -Technologies used :
NodeJs - VueJs - MongoDB - Sass

## -Installation
* ### Prerequisite :
You must have installed on your machine :
* Git : https://git-scm.com/downloads
* Node.js : https://nodejs.org/en/
---
* ### To install dependencies do a npm install on the folder below :
---
Open a terminal on the **FRONT** folder and do :
```bash
npm install
```
Open a terminal on the **BACK** folder and do : 
```bash
npm install
```
---
* ### To configure the database + key for decode the token + server api + port :
---
Create a .env file in **BACK** folder and write this and complete your configuration between ""
```bash
DATABASE_URI=""
TOKEN=""
REFRESH_TOKEN=""
PORT=""
API=""
```
Create a .env file in **FRONT** folder and write this and complete your configuration between ""
```bash
VUE_APP_BACK=""
```
_you can find example in the env sample file_

---
* ### Create a "images" folder in the ***BACK*** folder
---
## -Launch
Open a terminal on the **FRONT** folder and do :
```bash
npm run serve
```
Open a terminal on the **BACK** folder and do : 
```bash
nodemon server
```
or
```bash
npm start
```
Open browser at http://localhost:8080/
---
## Features :
* Create an account and log in
* Create a post (with or without photos)
* Edit a post (with or without photos)
* Delete a post
* Like a post
* Admin account

**If you want your account admin you just have to set "isAdmin" to "true" on your account in the database**

Have a good time !
