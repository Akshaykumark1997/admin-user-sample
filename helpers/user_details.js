const db = require('../confi/connection');
module.exports = {
    addUser:(user,callback)=>{
        db.get().collection('users').insertOne(user).then((data)=>{
            callback(true);
        })
    },
    findUser:(email)=>{
        return new Promise(async(resolve,reject)=>{
            let userDetails = await db.get().collection('users').findOne({email:email})
            resolve(userDetails);

            // console.log(userDetails);
        })
    }
}