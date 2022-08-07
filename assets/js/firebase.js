
var firebaseConfig = {
    apiKey: "AIzaSyDOne-swdHmSrAvJOxeCMGrpeDNJQ1Di4A",
    authDomain: "mutamimon-c1e68.firebaseapp.com",
    databaseURL: "https://mutamimon-c1e68-default-rtdb.firebaseio.com",
    projectId: "mutamimon-c1e68",
    storageBucket: "mutamimon-c1e68.appspot.com",
    messagingSenderId: "7245330178",
    appId: "1:7245330178:web:3a792f8f0b3215f915b41b",
    measurementId: "G-JVCXL6GDES"
};

firebase.initializeApp(firebaseConfig);


let images = []
let thePhoto;
let currImg = [];

var messagesRef = firebase.database()
    .ref('Projects');


function submitForm() {
    var name = getInputVal('name');
    var category = getInputVal('category');
    var current = getInputVal('categoryProject');
    let curr;
    let details = [];
    if (current == "true")
        curr = true;
    else curr = false;
    if (document.getElementById("member").value > 0) {
        for (let i = 0; i < document.getElementById("member").value; i++) {
            let id = '_' + Math.random().toString(36).substr(2, 9);
            let obj = {
                id: id,
                text: document.getElementById(i).value
            }
            details.push(obj)
        }
    };

    var desc = getInputVal('desc');
    var price = getInputVal('price');
    var latitude = getInputVal('latitude');
    var longitude = getInputVal('longitude');
    let id = '_' + Math.random().toString(36).substr(2, 9);
    saveMessage(id, name, category, images, desc, price, curr, latitude, longitude, details, thePhoto);
    document.getElementById("myForm").reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(id, name, category, images, desc, price, curr, latitude, longitude, details, thePhoto) {
    //CHECK THAT EVERY VALUE IS NOT A NULL / UNDEFINED


    firebase.database().ref('Projects/' + id).set({
        id: id,
        curr: curr,
        name: name,
        category: category,
        photo: images,
        desc: desc,
        price: price,
        latitude: latitude,
        longitude: longitude,
        details: details,
        thePhoto: thePhoto
    });


}




function uploadimage() {
    var type = "1";
    var storage = firebase.storage();
    var file = document.getElementById("files").files[0];
    var storageref = storage.ref();
    var thisref = storageref.child(type).child(file.name).put(file);
    thisref.on('state_changed', function (snapshot) {


    }, function (error) {

    }, function () {
        // Uploaded completed successfully, now we can get the download URL
        thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {

            thePhoto = downloadURL;
            document.getElementById("zaPhoto").src = thePhoto;

            alert("تم اضافة الصوره بنجاح");

        });
    });

}


function uploadPhotos() {
    var type = "2";
    var storage = firebase.storage();
    var file = document.getElementById("photos").files[0];
    var storageref = storage.ref();
    var thisref = storageref.child(type).child(file.name).put(file);
    thisref.on('state_changed', function (snapshot) {


    }, function (error) {

    }, function () {
        // Uploaded completed successfully, now we can get the download URL
        thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {

            let id = '_' + Math.random().toString(36).substr(2, 9);
            let obj = {
                url: downloadURL,
                id: id
            }
            images.push(obj);
            currImg.push(obj);
            alert("تم اضافه الصوره بنجاح");

        });
    });


}

// -------------------------------------------------------------------------


var nameProje, catProje, genProje, priceProje, detailsProje, mainPhotoProje, photosProje, latitudeProje, longitudeProje, descProje;


// function Ready(){
//     nameProje = document.getElementById("name").value ;
//     catProje = document.getElementById("category").value ;
//     genProje = document.getElementById("categoryProject").value ;
//     priceProje = document.getElementById("price").value ;
//     detailsProje = document.getElementById("member").value ;
//     mainPhotoProje = document.getElementById("files").value ;
//     photosProje = document.getElementById("photos").value ;
//     latitudeProje = document.getElementById("latitude").value ;
//     longitudeProje = document.getElementById("longitude").value ;
//     descProje = document.getElementById("desc").value ;
// }


document.getElementById("select").onclick = function () {
    // Ready();
    //Project Data/yalla ?
    var messagesRef = firebase.database()
        .ref('Projects');
    let arr = [];
    messagesRef.once("value", (snapshot) => {
        snapshot.forEach((element) => {
            console.log(element.val());
            element.val().name === document.getElementById("name").value ? arr.push(element.val()) : console.log("Bye");

        });
        alert(arr[0].id);
        localStorage.setItem("id", arr[0].id);
        //  document.getElementById("name").value = snapshot.val().name
        if (arr[0].category) {
            document.getElementById("category").value = arr[0].category
        }
        //    document.getElementById("categoryProject").value = arr[0].curr
        var container = document.getElementById("container");
        // Remove every children it had before
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        for (let i = 0; i < arr[0].details.length; i++) {
            // Append a node with a random text
            container.appendChild(document.createTextNode(" تفصيل" + (i + 1)));
            // Create an <input> element, set its type and name attributes
            var input = document.createElement("input");
            input.type = "text";
            input.id = i
            input.value = arr[0].details[i].text
            container.appendChild(input);
            // Append a line break 
            container.appendChild(document.createElement("br"));
        }
        var lp = new locationPicker('map', {
            setCurrentPosition: true,
            lat: arr[0].latitude,
            lng: arr[0].longitude
        }, { zoom: 13 });
        google.maps.event.addListener(lp.map, 'idle', function (event) {
            var location = lp.getMarkerPosition();
            document.getElementById('latitude').value = location.lat;
            document.getElementById('longitude').value = location.lng
        });
        document.getElementById("price").value = arr[0].price
        //    console.log(document.getElementById("files"));
        document.getElementById("zaPhoto").src = arr[0].thePhoto;
        //--------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------

        //--------------------------------------------------------------------------------
        // img
        // p

        //--------------------------------------------------------------------------------

        //--------------------------------------------------------------------------------

        var container = document.getElementById("forThat");
        var forThis = document.getElementById("forThis");
        for (let j = 0; j < arr[0].photo.length; j++) {
            var input = document.createElement("img");
            input.src = arr[0].photo[j].url;
            input.id = arr[0].photo[j].id;
            // container.style.width = "50px"
            // forThis.style.width = "50px"
            forThis.appendChild(input);
            let btn = document.createElement("button");
            btn.id = arr[0].photo[j].id;
            btn.innerText = "X";
            btn.style = "border : none ; width:40px ; height:40px ; font-size : 0.8rem ; color:black; border-radius: 50%;font-weigth:bold";
            input.style.width = "150px"

            btn.addEventListener("click", function () {

                arr[0].photo[j].url.delete().then(() => {

                    alert("File deleted successfully")
                }).catch((error) => {
                    alert("Uh-oh, an error occurred!")
                });

            })
            currImg = arr[0].photo
            forThis.appendChild(btn);
            container.appendChild(forThis);

            // Append a line break 
            container.appendChild(document.createElement("br"));
        }

        document.getElementById("latitude").value = arr[0].latitude
        document.getElementById("longitude").value = arr[0].longitude
        document.getElementById("desc").value = arr[0].desc
        document.getElementById("member").value = arr[0].details.length;
    });



}
// document.getElementById("ID ZORAR EL DELETE BTA3 EL IMG").onclick =  function(){

// }
document.getElementById("update").onclick = function () {
    let id = localStorage.getItem("id");
    if (!id)
        alert("الرجاء اختيار المشروع أولا");
    else {
        let curr;
        let detol = []
        if ("true" == document.getElementById("categoryProject").value)
            curr = true;
        else curr = false;
        if (document.getElementById("member").value > 0) {
            for (let i = 0; i < document.getElementById("member").value; i++) {
                let id = '_' + Math.random().toString(36).substr(2, 9);
                let obj = {
                    id: id,
                    text: document.getElementById(i).value
                }
                detol.push(obj)
            }
        };
        let num = document.getElementById("forThis");
        if (currImg.length < num.getElementsByTagName("img").length) {

        }
        const db = firebase.database().ref().child("Projects").child(id);
        db.update({
            'name': document.getElementById("name").value,
            'category': document.getElementById("category").value,
            'curr': curr,
            'price': document.getElementById("price").value,
            'latitude': document.getElementById("latitude").value,
            'longitude': document.getElementById("longitude").value,
            'desc': document.getElementById("desc").value,
            'thePhoto': document.getElementById("zaPhoto").src,
            'details': detol,
            'photo': currImg
        })

    }
    document.getElementById("myForm").reset().then(()=>{
        window.location.reload()
    })
   
}
document.getElementById("delete").onclick = function () {
    let id = localStorage.getItem("id");
    if (!id)
        alert("الرجاء اختيار المشروع أولا");
    else {
        const db = firebase.database().ref().child("Projects").child(id);
        db.remove();
        alert("تم مسح المشروع");
        document.getElementById("myForm").reset().then(()=>{
            window.location.reload()
        })

    }
}





