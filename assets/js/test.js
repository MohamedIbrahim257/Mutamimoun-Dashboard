

let thePhotoNews;

var messagesRef = firebase.database()
    .ref('News');


function submitFormNews() {
    var nameNews = document.getElementById('nameNews').value;
    var textBox = document.getElementById("textBox").innerText
    // let id = '_' + Math.random().toString(36).substr(2, 9);
    if (!nameNews, !thePhotoNews, !textBox) {
        alert("الرجاء ملئ الخانات الفارغه")
    } else {
        saveMessageNews(nameNews, thePhotoNews, textBox);
        window.location.reload("")
        alert("تم الاضافه")
    }


}

// Function to get get form values
// function getInputVal(id) {
//     return document.getElementById(id).value;
   
// }





// Save message to firebase
function saveMessageNews(nameNews, thePhotoNews, textBox) {
    //CHECK THAT EVERY VALUE IS NOT A NULL / UNDEFINED
    let d = Date.now();
    firebase.database().ref('News/' + d).set({
        id: d,
        nameNews: nameNews,
        thePhotoNews: thePhotoNews,
        textBox: textBox,
        createdAt: d,
    });


}





function uploadimageNews() {
    var type = "7";
    var storage = firebase.storage();
    var file = document.getElementById("imageNews").files[0];
    var storageref = storage.ref();
    var thisref = storageref.child(type).child(file.name).put(file);
    thisref.on('state_changed', function (snapshot) {


    }, function (error) {

    }, function () {
        // Uploaded completed successfully, now we can get the download URL
        thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {

            thePhotoNews = downloadURL;
            document.getElementById("thePhotoNews").src = thePhotoNews;

            alert("تم اضافة الصوره بنجاح");

        });
    });

}




// -------------------------------------------------------------------------


document.getElementById("selectNews").onclick = function () {


    var invoked1 = document.getElementById("saveNews");
    var invoked2 = document.getElementById("updateNews");
    var invoked3 = document.getElementById("deleteNews");

    invoked1.classList.add("d-none");
    invoked2.classList.replace("d-none", "d-inline-block");
    invoked3.classList.replace("d-none", "d-inline-block")

    var messagesRef = firebase.database()
        .ref('News');
    let array = [];
    messagesRef.once("value", (snapshot) => {
        snapshot.forEach((elementNews) => {
            console.log(elementNews.val());
            elementNews.val().nameNews === document.getElementById("nameNews").value ? array.push(elementNews.val()) : console.log("Bye");

        });

        if (array.length > 0) {
            localStorage.setItem("id", array[0].id);

            document.getElementById("thePhotoNews").src = array[0].thePhotoNews;
            document.getElementById("textBox").innerText = array[0].textBox;


        } else {
            invoked1.classList.add("d-none");
            invoked2.classList.replace("d-inline-block", "d-none");
            invoked3.classList.replace("d-inline-block", "d-none")
            alert("اسم المشروع خطآ")
        }


    });



}




document.getElementById("updateNews").onclick = function () {
    let id = localStorage.getItem("id");
    if (!id)
        alert("الرجاء اختيار المشروع أولا");
    else {



        const dbNews = firebase.database().ref().child("News").child(id);
        dbNews.update({
            'nameNews': document.getElementById("nameNews").value,
            'thePhotoNews': document.getElementById("thePhotoNews").src,
            'textBox': document.getElementById("textBox").innerText
        })



        window.location.reload("/")


        alert("تم التعديل")

    }


}
document.getElementById("deleteNews").onclick = function () {
    let id = localStorage.getItem("id");
    if (!id)
        alert("الرجاء اختيار المشروع أولا");
    else {
        const dbNews = firebase.database().ref().child("News").child(id);
        dbNews.remove();

        window.location.reload("/")
        alert("تم مسح المشروع");


    }
}



var messagesRef = firebase.database()
    .ref('News');
console.log(messagesRef);

let arrNews = []
messagesRef.once("value", (snapshot) => {
    snapshot.forEach((element) => {
        console.log(element.val());
        arrNews.push(element.val());
        // console.log(arr);
    })
    arrNews.map(e => {
        document.getElementById("crudNews").innerHTML += `

  <tr>
  <td>${e.nameNews}</td>
  <td><img width="100" src="${e.thePhotoNews}" /></td>

  </tr>

    
`
    })


})




