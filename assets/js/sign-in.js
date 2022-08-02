var userName = document.getElementById("userName") ;
var Password = document.getElementById("password") ;





function login(){
  if(userName.value === "Muta" && Password.value === "12345"){
   window.location.replace("rtl.html")
  }else{
    alert("l2222")
  }
}




function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };


