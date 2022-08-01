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



var messagesRef = firebase.database()
    .ref('Project Data');

// document.getElementById('contactForm')
//   .addEventListener('submit', submitForm);

function submitForm() {
    alert(
        "hena"
    );
    // e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var category = getInputVal('category');
    var desc = getInputVal('desc'); 
    var price = getInputVal('price'); 
    var col1 = getInputVal ('col1')
    var col2 = getInputVal ('col2')
    var col3 = getInputVal ('col3')
    var col4 = getInputVal ('col4')
    var col5 = getInputVal ('col5')
    var col6 = getInputVal ('col6')


    // alert(name);
    // var photo = getInputVal('Project-photo');

    saveMessage(name, category, images, desc ,price ,col1 , col2 , col3 , col4 , col5 ,col6);
    // document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, category, images, desc ,price ,col1 , col2 , col3 , col4 , col5 ,col6) {
    alert(name)
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        category: category,
        photo: images,
        desc: desc ,
        price : price , 
        col1 : col1 ,
        col2 : col2 ,
        col3 : col3 ,
        col4 : col4 ,
        col5 : col5 ,
        col6 : col6 ,
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
            images.push(downloadURL);
            alert(downloadURL);
            //  saveMessage(downloadURL);
        });
    });

    // Get values
    //  var url = getInputVal('url');
    // Save message
    // saveMessage(url);
}


// function uploadPhotos() {
//     var type = "2";
//     var storage = firebase.storage();
//     var file = document.getElementById("photos").files[0];
//     var storageref = storage.ref();
//     var thisref = storageref.child(type).child(file.name).put(file);
//     thisref.on('state_changed', function (snapshot) {


//     }, function (error) {

//     }, function () {
//         // Uploaded completed successfully, now we can get the download URL
//         thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//             //getting url of image
//             //  document.getElementById("url").value=downloadURL;
//             images.push(downloadURL);
//             alert(downloadURL);
//             //  saveMessage(downloadURL);
//         });
//     });

//     // Get values
//     //  var url = getInputVal('url');
//     // Save message
//     // saveMessage(url);
// }

