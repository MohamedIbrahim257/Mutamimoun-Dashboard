var userName = document.getElementById("userName");
var Password = document.getElementById("password");





function login() {
  if (userName.value === "Muta" && Password.value === "12345") {
    window.location.replace("pages/rtl.html")
  } else {
    var valdity = document.getElementById("validty").innerHTML = "خطأ اسم المستخدم وكلمة المرور غير صحيحة"

  }
}




function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };


