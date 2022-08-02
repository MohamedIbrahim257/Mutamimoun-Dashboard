var userName = document.getElementById("userName");
var Password = document.getElementById("password");





function login() {
  if (userName.value === "Muta2022" && Password.value === "muta*2022") {
    window.location.replace("pages/rtl.html")
  } else {
    var valdity = document.getElementById("validty").innerHTML = "خطأ اسم المستخدم وكلمة المرور غير صحيحة"

  }
}




function disableBack() { window.history.forward(); }
setTimeout("disableBack()", NaN);
window.onunload = function () { null };


