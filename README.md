ADD HEADER IMAGE

# Hitch
### Table of Contents
1. [General Info](#General-Info)
2. [Demo](#Demo)
4. [Installation](#Installation-and-Setup)
5. [Contributors](#Contributors)
6. [File Structure](#File-Structure)

### General Info
Hitch is a responsive web app for rideshares and carpooling.

### Demo
#### Signup
![signup](https://user-images.githubusercontent.com/52397472/152586006-23051343-780d-4205-85dd-82963164e28f.gif)

#### Search Rides
![rides](https://user-images.githubusercontent.com/52397472/152585942-62d31d64-9924-45ec-aafb-06d2fb6b1032.gif)

#### Post a Ride
![postride](https://user-images.githubusercontent.com/52397472/152585921-b1018342-882d-455f-8609-8d8f1ac782cb.gif)

#### Live Chat
ADD GIF HERE

#### User Profiles
ADD GIF HERE

### Installation and Setup
1. Clone down the repo `$ git clone https://github.com/project-blue-ocean/front-end.git`
2. Add a config.js file to the /server directory.
4. cd into the cloned repo `$ cd ../front-end`
5. install dependencies `$ npm i`
##### Development Mode (2 terminal windows)
5. start webpack `$ npm run start`
6. start express server `$ npm run start-server`
##### Production Mode (1 terminal window)
5. build bundle `$ npm run build`
6. start server `$ npm run start-server`

### Contributors
- [Alexander Huerta](https://github.com/alexander-huerta)
- [Cory Zauss](https://github.com/CoryZauss)
- [Kacy Holm](https://github.com/KacyHolm)
- [Regina Grogan](https://github.com/RehReis)
- [Aaron Finsrud](https://github.com/AaronFinsrud)

### File Structure
├── client
    ├── dist
        ├── bundle.js
        ├── index.html
    ├── src
      ├── assets
      ├── components
          ├── Login.jsx
          ├── Main.jsx
          ├── Map.jsx
          ├── MenuOption.jsx
          ├── Message.jsx
          ├── PostRide.jsx
          ├── Profile.jsx
          ├── ReviewCard.jsx
          ├── ReviewModal.jsx
          ├── SignUp.jsx
          ├── Toast.jsx
          ├── UserContacted.jsx
      ├── contexts
          ├── index.jsx
      ├── firebase
          ├── index.js
          ├── PrivateRoute.jsx
      ├── App.css
      ├── App.jsx
├── diagrams
    ├── ComponentTree.pgn
    ├── DataFlow.png
    ├── Views.png
├── functions
├── server
    ├── index.js

