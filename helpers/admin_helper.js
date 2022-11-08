const { response } = require("express");
const db = require("../confi/connection");
const objectId = require('mongodb').ObjectId;
const bcrypt = require("bcrypt");

module.exports ={
    getAllUsers:()=>{
         return new Promise(async(resolve,reject)=>{
            let allUsers = await db.get().collection('users').find().toArray();
            resolve(allUsers);
         });
    },
    deleteUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('users').deleteOne({_id:objectId(id)}).then((response)=>{
                resolve(response);
            });
        });
    },
    addUser:(newuser)=>{
        return new Promise(async(resolve,reject)=>{
            newuser.password = await bcrypt.hash(newuser.password, 10);
            db.get().collection("users").insertOne(newuser).then((data) => {
                resolve(data);
              });
        });
    }
}