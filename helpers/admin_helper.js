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
    },
    editUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('users').findOne({_id:objectId(id)}).then((data)=>{
            resolve(data);
        }); 
        })
    },
    editUserDetails:(id,userDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('users').updateOne({_id:objectId(id)},{
                $set:{
                    name:userDetails.name,
                    email:userDetails.email
                }
            }).then((response)=>{
                resolve();
            });
        });
    },
    // searchUser:(searchInput)=>{
    //     return new Promise(async(resolve,reject)=>{
    //      let allUsers = db.get().collection('users').find({name:searchInput}).toArray();
    //      resolve(allUsers);
    //     })
    // }
}