import express from 'express';
import { User } from "../model/userModel";

let userRouter = express.Router();

let userArray: User[] = [];

//Get all users
userRouter.get('/', (req, res, next) => {
    Object.defineProperty(userArray, 'password', {
        enumerable: false,
        writable: true
    });
    res.send(userArray);
});

//Get user by id
userRouter.get('/:id', (req, res, next) => {
    let id = req.params.id;
    let myUser = userArray.find(user => user.id == id);
    if (myUser) {
        let cloneUser = new User('', '', '', '','');
        Object.assign(cloneUser, myUser);
        Object.defineProperty(cloneUser, 'password', {
            enumerable: false,
            writable: true
        });
        res.send(cloneUser);
    }
    else {
        res.status(404).send({ message: 'User not Found', status:'404' });
    }
});

//Create user
userRouter.post('/', (req, res, next) => {
    let myUser = new User('', '', '', '','');    
    Object.assign(myUser, req.body);
    Object.defineProperty(myUser, 'password', {
        enumerable: false,
        writable: true
    });
    
    console.log(myUser);


    let valuesArray = Object.values(myUser);
    let idArray: string[] = [];

    var hasAllData: boolean = true;
    var hasUniqueId: boolean = true;

    userArray.forEach(element => {
        idArray.push(element.id);
    });

    var hasAllData: boolean = true;
    var hasUniqueId: boolean = true;

    //Check that all properties are filled out
    valuesArray.forEach(element => {
        if (element === ""){
            res.status(406).send({ message: 'All properties (userId,firstName,lastName,emailAddress, password) are required for new users', status: '406'})
            hasAllData = false;
        }        
    });

    //Check that there are no duplicates (id's)
    idArray.forEach(element => {
        if (element == myUser.id){
            res.status(409).send({ message: 'User ID is already in use', status: '409'})
            hasUniqueId = false;
        }
    }); 

    //Add new user if everything is good
    if(hasAllData && hasUniqueId){
        userArray.push(myUser);
        res.status(201).send(myUser);
    }        
});

//Update user
userRouter.patch('/:id', (req, res, next) => {
    let id = req.params.id;
    let myUser = userArray.find(user => user.id == id);
    if (myUser) {
        Object.assign(myUser, req.body);
        myUser.id = id;
        res.send(myUser);
    }
    else {
        res.status(404).send({ message: 'User not Found', status: '404' });
    }
});

//Delete User
userRouter.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    let myUser = userArray.find(user => user.id == id);
    if (myUser) {
        userArray = userArray.filter(user => user.id != id);
        res.status(204).send(userArray);
    }
    else {
        res.status(404).send({ message: 'User not Found', status: '404' });
    }
});

export { userRouter as userRouter };