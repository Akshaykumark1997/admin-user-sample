const db = require("../confi/connection");

module.exports ={
    getAllUsers:()=>{
         return new Promise(async(resolve,reject)=>{
            let allUsers = await db.get().collection('users').find().toArray();
            resolve(allUsers);
         });
    }
}