
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
let pdf;
let adv;

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
    var advLink = getInputVal('advLink');
    let id = '_' + Math.random().toString(36).substr(2, 9);
    if (!name, !category, !images, !desc, !curr, !latitude, !longitude, !details, !thePhoto ,!pdf , !adv ) {
        alert("الرجاء ملئ الخانات الفارغه")
    } else {
        saveMessage(id, name, category, images, desc, price, curr, latitude, longitude, details, thePhoto, pdf, adv ,advLink);
        window.location.reload("")
        alert("تم الاضافه")
    }

  
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}





// Save message to firebase
function saveMessage(id, name, category, images, desc, price, curr, latitude, longitude, details, thePhoto, pdf, adv ,advLink) {
    //CHECK THAT EVERY VALUE IS NOT A NULL / UNDEFINED
    let d = Date.now();
    firebase.database().ref('Projects/' + d).set({
        id: d,
        curr: curr,
        name: name,
        category: category,
        photo: images,
        pdf: pdf,
        desc: desc,
        price: price,
        latitude: latitude,
        longitude: longitude,
        details: details,
        thePhoto: thePhoto,
        createdAt: d,
        adv: adv,
        advLink:advLink
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

function uploadPdf() {
    var type = "3";
    var storage = firebase.storage();
    var file = document.getElementById("filespdf").files[0];
    var storageref = storage.ref();
    var thisref = storageref.child(type).child(file.name).put(file);
    thisref.on('state_changed', function (snapshot) {


    }, function (error) {

    }, function () {
        // Uploaded completed successfully, now we can get the download URL
        thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {

            pdf = downloadURL;
            document.getElementById("namepdf").src = pdf;
            alert("تم اضافة PDF بنجاح");

        });
    });

}

function uploadimageAdv() {
    var type = "4";
    var storage = firebase.storage();
    var file = document.getElementById("filesadv").files[0];
    var storageref = storage.ref();
    var thisref = storageref.child(type).child(file.name).put(file);
    thisref.on('state_changed', function (snapshot) {


    }, function (error) {

    }, function () {
        // Uploaded completed successfully, now we can get the download URL
        thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {

            adv = downloadURL;
            document.getElementById("advPhoto").src = adv;
            alert("تم اضافه صوره المساحه اللاعلانيه");

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



    var invoked1 = document.querySelector(".save");
    // var invoked2 = document.querySelector(".saveBottom");
    invoked1.classList.add("d-none")
    // invoked2.classList.add("d-none")

    var messagesRef = firebase.database()
        .ref('Projects');
    let arr = [];
    messagesRef.once("value", (snapshot) => {
        snapshot.forEach((element) => {
            console.log(element.val());
            element.val().name === document.getElementById("name").value ? arr.push(element.val()) : console.log("Bye");

        });

        if (arr.length > 0) {
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
            document.getElementById("namepdf").src = arr[0].pdf;
            document.getElementById("advPhoto").src = arr[0].adv;
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
                forThis.appendChild(input);
                var btn = document.createElement("button");
                btn.id = arr[0].photo[j].id;
                btn.name = arr[0].photo[j].id;
                btn.innerText = "X";
                btn.style = "border : none ; width:40px ; height:40px ; font-size : 0.8rem ; color:black; border-radius: 50%;font-weigth:bold";
                input.style.width = "150px"
                btn.onclick = function () {
                    uClicked(arr[0].photo[j].id);
                }
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
            document.getElementById("namepdf").src = arr[0].pdf
            document.getElementById("advPhoto").src = arr[0].adv
            if( document.getElementById("advLink").value = arr[0].advLink == undefined){
                document.getElementById("advLink").value = ""
            } else{
                document.getElementById("advLink").value = arr[0].advLink 
            }
           

            //// button invoked 

        } else {
            alert("اسم المشروع خطآ")
        }


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
            'photo': currImg,
            'pdf': document.getElementById("namepdf").src,
            'adv': document.getElementById("advPhoto").src,
            'advLink':document.getElementById("advLink").value
        })



        window.location.reload("/")


        alert("تم التعديل")

    }

    
}
document.getElementById("delete").onclick = function () {
    let id = localStorage.getItem("id");
    if (!id)
        alert("الرجاء اختيار المشروع أولا");
    else {
        const db = firebase.database().ref().child("Projects").child(id);
        db.remove();

        window.location.reload("/")
        alert("تم مسح المشروع");


    }
}

function uClicked(imgId) {

    const index = currImg.findIndex(o => {
        return o.id === imgId
    });
    currImg.splice(index, 1)
    document.getElementById(imgId).remove();
    document.getElementById(imgId).remove();


}

