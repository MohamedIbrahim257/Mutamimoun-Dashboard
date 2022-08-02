// const { data } = require("jquery");

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
let thePhoto ;


var messagesRef = firebase.database()
    .ref('Project Data');

// document.getElementById('contactForm')
//   .addEventListener('submit', submitForm);

function submitForm() {
    var name = getInputVal('name');
    var category = getInputVal('category');
    var current = getInputVal('categoryProject');
    let curr ;
    let details = [];
    if(current == "true")
            curr = true;
         else curr = false;
    if(document.getElementById("member").value > 0){
            for(let i =0; i<document.getElementById("member").value ; i++){
                let id = '_' + Math.random().toString(36).substr(2, 9);
                let obj = {
                    id : id,
                    text : document.getElementById(i).value
                }
                details.push(obj)
            }
    };    
    
    var desc = getInputVal('desc'); 
    var price = getInputVal('price'); 
    var latitude = getInputVal ('latitude');
    var longitude = getInputVal ('longitude');
    let id = '_' + Math.random().toString(36).substr(2, 9);
    alert(id)
    saveMessage(id, name, category, images, desc ,price ,curr, latitude ,longitude ,details,thePhoto);
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(id,name, category, images, desc ,price ,curr ,latitude , longitude, details,thePhoto) {
    alert(name)
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        id:id,
        curr : curr,
        name: name,
        category: category,
        photo: images,
        desc: desc ,
        price : price , 
        latitude : latitude,
        longitude :longitude,
        details: details,
        thePhoto : thePhoto
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
            //getting url of image
            //  document.getElementById("url").value=downloadURL;
           thePhoto = downloadURL;
            alert(downloadURL);
            //  saveMessage(downloadURL);
        });
    });

    // Get values
    //  var url = getInputVal('url');
    // Save message
    // saveMessage(url);
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
            //getting url of image
            //  document.getElementById("url").value=downloadURL;
            let id = '_' + Math.random().toString(36).substr(2, 9);
            let obj = {
                url : downloadURL,
                id : id
            }
            images.push(obj);
            alert(downloadURL);
            //  saveMessage(downloadURL);
        });
    });

    // Get values
    //  var url = getInputVal('url');
    // Save message
    // saveMessage(url);
}

