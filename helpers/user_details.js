const db = require("../confi/connection");
const bcrypt = require("bcrypt");
module.exports = {
  addUser: (user) => {
    return new Promise(async (resolve, reject) => {
      user.password = await bcrypt.hash(user.password, 10);
      user.repeatpassword = await bcrypt.hash(user.repeatpassword,10);
      db.get()
        .collection("users")
        .insertOne(user)
        .then((data) => {
          resolve(data);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginstatus = false;
      let response = {};
      let user = await db
        .get()
        .collection("users")
        .findOne({ email: userData.email });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            console.log("login-success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("incorrect password");
            resolve({ status: false });
          }
        });
      } else {
        console.log("no user available");
        resolve({ status: false });
      }
    });
  },
};
