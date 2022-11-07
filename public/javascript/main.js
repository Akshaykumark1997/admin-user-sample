const { use } = require("../../routes/user");

function checkLoginForm(form) {
  username = document.getElementById("name");
  email = document.getElementById("email");
  password = document.getElementById("password");
  if (username.value == "") {
    document.getElementById("nameError").innerHTML="please enter your name";
    username.focus();
    return false;
  }
  if (email.value == "") {
    document.getElementById("emailError").innerHTML = "please enter your email";
    email.focus();
    return false;
  }
  re = /^[-_a-zA-Z0-9.,@#!?]*$/;
  if (!re.test(email.value)) {
    document.getElementById("EmailError").innerHTML = "please enter a vaild email";
    email.focus();
    return false;
  }

  if (password.value == "") {
    document.getElementById("passwordError").innerHTML = "please enter your password";
    password.focus();
    return false;
  }
  return true;
}
