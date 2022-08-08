

let thePhotoNews;

var messagesRef = firebase.database()
    .ref('News');


function submitFormNews() {
    var nameNews = getInputVal('nameNews');
    var descNews = getInputVal("descNews")
    let id = '_' + Math.random().toString(36).substr(2, 9);
    if (!nameNews, !thePhotoNews, !descNews) {
        alert("الرجاء ملئ الخانات الفارغه")
    } else {
        saveMessageNews(nameNews, thePhotoNews, descNews);
        window.location.reload("")
        alert("تم الاضافه")
    }


}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}





// Save message to firebase
function saveMessageNews(nameNews, thePhotoNews, descNews) {
    //CHECK THAT EVERY VALUE IS NOT A NULL / UNDEFINED
    let d = Date.now();
    firebase.database().ref('News/' + d).set({
        id: d,
        nameNews: nameNews,
        thePhotoNews: thePhotoNews,
        descNews: descNews,
        createdAt: d,
    });


}




function uploadimageNews() {
    var type = "5";
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



    var invokedNews = document.querySelector(".saveBottomNews");
    invokedNews.classList.add("d-none")

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
            document.getElementById("descNews").value = array[0].descNews;


        } else {
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
            'descNews': document.getElementById("descNews").value
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

