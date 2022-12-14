
var firebaseConfig = {
    apiKey: "AIzaSyCO34YMDe_17kdaXk1rmEJMjRV33mL_3Ek",
    authDomain: "valliys.firebaseapp.com",
    databaseURL: "https://valliys-default-rtdb.firebaseio.com",
    projectId: "valliys",
    storageBucket: "valliys.appspot.com",
    messagingSenderId: "440689896549",
    appId: "1:440689896549:web:1c7cb8aeb298633d57ea8c",
    measurementId: "G-DTG8HYXKQK"
};

firebase.initializeApp(firebaseConfig);


let images = [];
let imagesDetails = [];
let currImgDetails = [];
let thePhoto;
let currImg = [];
let pdf;
let adv;


var messagesRef = firebase.database()
    .ref('Projects');


function submitForm() {
    var name = getInputVal('name');
    var category = getInputVal('category');
    var status = getInputVal('status');
    var current = getInputVal('categoryProject');

    let details = [];

    // if (document.getElementById("member").value > 0) {
    //     for (let i = 0; i < document.getElementById("member").value; i++) {
    //         let id = '_' + Math.random().toString(36).substr(2, 9);
    //         let obj = {
    //             id: id,
    //             text: document.getElementById(i).value
    //         }
    //         details.push(obj)
    //     }
    // };

    var desc = getInputVal('desc');
    var price = getInputVal('price');
    var latitude = getInputVal('latitude');
    var longitude = getInputVal('longitude');
    var advLink = getInputVal('advLink');
    let id = '_' + Math.random().toString(36).substr(2, 9);


    if (!name, !category, !status, !images, !desc, !current, !latitude, !longitude, !details, !thePhoto) {
        alert("الرجاء ملئ الخانات الفارغه")
    } else {
        saveMessage(id, name, category, status, images, desc, price, current, latitude, longitude, details, thePhoto, pdf, adv, advLink ,imagesDetails);
        window.location.reload("")
        alert("تم الاضافه")
    }



}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}





// Save message to firebase

function saveMessage(id, name, category, status, images, desc, price, current, latitude, longitude, details, thePhoto, pdf, adv, advLink ,imagesDetails) {
    //CHECK THAT EVERY VALUE IS NOT A NULL / UNDEFINED
    let d = Date.now();
    firebase.database().ref('Projects/' + d).set({
        id: d,
        current: current,
        name: name,
        category: category,
        status: status,
        imagesDetails:imagesDetails,
        photo: images,
        pdf: pdf || "",
        desc: desc,
        price: price,
        latitude: latitude,
        longitude: longitude,
        details: details,
        thePhoto: thePhoto,
        createdAt: d,
        adv: adv || "",
        advLink: advLink
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


function uploadPhotosDetails() {
    var type = "6";
    var storage = firebase.storage();
    var file = document.getElementById("photosDetails").files[0];
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
            imagesDetails.push(obj);
            currImgDetails.push(obj);
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



    var invoked1 = document.querySelector(".save");
    var invoked2 = document.getElementById("update");
    var invoked3 = document.getElementById("delete");

    invoked1.classList.add("d-none");
    invoked2.classList.replace("d-none", "d-inline-block");
    invoked3.classList.replace("d-none", "d-inline-block")



    var messagesRef = firebase.database()
        .ref('Projects');
        console.log(messagesRef)
    let arr = [];
    messagesRef.once("value", (snapshot) => {
        snapshot.forEach((element) => {
            console.log(element.val());
            element.val().name === document.getElementById("name").value.trim() ? arr.push(element.val()) : console.log("Bye");

        });

        if (arr.length > 0) {
            localStorage.setItem("id", arr[0].id);

            if (arr[0].category) {
                document.getElementById("category").value = arr[0].category
            }
            if (arr[0].status) {
                document.getElementById("status").value = arr[0].status
            }
            if (arr[0].current) {
                document.getElementById("categoryProject").value = arr[0].current
            }

            // var container = document.getElementById("container");
            // // Remove every children it had before
            // while (container.hasChildNodes()) {
            //     container.removeChild(container.lastChild);
            // }
            // if (arr[0].details) {
            //     for (let i = 0; i < arr[0].details.length; i++) {
            //         // Append a node with a random text
            //         container.appendChild(document.createTextNode(" تفصيل" + (i + 1)));
            //         // Create an <input> element, set its type and name attributes
            //         var input = document.createElement("input");
            //         input.type = "text";
            //         input.id = i
            //         input.value = arr[0].details[i].text
            //         container.appendChild(input);
            //         // Append a line break 
            //         container.appendChild(document.createElement("br"));
            //     }
            // }

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
            document.getElementById("zaPhoto").src = arr[0].thePhoto;
            
                document.getElementById("namepdf").src = arr[0].pdf 
           
             
             
                document.getElementById("advPhoto").src = arr[0].adv 
                // document.getElementById("projectDetails").src = arr[0].projectDetails 
        
           
          


            //--------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------

            //--------------------------------------------------------------------------------
            // img
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
                btn.style = "border : none ; width:30px ; height:30px ; font-size : 0.8rem ; color:white; border-radius: 50%;font-weight:bold ; background-color:black ; position:relative; left:30px";
                input.style.width = "150px"
                console.log(arr[0].photo[j].id);
                canBeh(btn, arr[0].photo[j].id)
                btn.onclick = function () {
                    let z =0;
                    if(j === 0 ){
                        console.log(arr[0].photo[j].id);
                        uClicked(arr[0].photo[j].id,j);
                    }  else {

                          console.log(j);

                        uClicked(arr[0].photo[5].id,j);

                    } 
                }
                console.log(btn);

                currImg = arr[0].photo;
                forThis.appendChild(btn);
                container.appendChild(forThis);
                // Append a line break 
                container.appendChild(document.createElement("br"));
            }


            var containerDetials = document.getElementById("forThatDetails");
            var forThisDetails = document.getElementById("forThisDetails");
            for (let y = 0; y < arr[0].imagesDetails.length; y++) {

                var inputDetails = document.createElement("img");
                inputDetails.src = arr[0].imagesDetails[y].url;
                inputDetails.id = arr[0].imagesDetails[y].id;
                forThisDetails.appendChild(inputDetails);
                var btnDetails = document.createElement("button");
                btnDetails.id = arr[0].imagesDetails[y].id;
                btnDetails.name = arr[0].imagesDetails[y].id;
                btnDetails.innerText = "X";
                btnDetails.style = "border : none ; width:30px ; height:30px ; font-size : 0.8rem ; color:white; border-radius: 50%;font-weight:bold ; background-color:black ; position:relative; left:30px";
                inputDetails.style.width = "150px"
                console.log(arr[0].imagesDetails[y].id);
                canBasha(btnDetails, arr[0].imagesDetails[y].id)
                btnDetails.onclick = function () {
                    let z =0;
                    if(y === 0 ){
                        console.log(arr[0].imagesDetails[y].id);
                        uClickedDetails(arr[0].imagesDetails[y].id,y);
                    }  else {

                          console.log(y);

                        uClickedDetails(arr[0].imagesDetails[0].id,y);

                    } 
                }
                console.log(btnDetails);

                currImgDetails = arr[0].imagesDetails;
                forThisDetails.appendChild(btnDetails);
                containerDetials.appendChild(forThisDetails);
                // Append a line break 
                containerDetials.appendChild(document.createElement("br"));
            }



            document.getElementById("latitude").value = arr[0].latitude
            document.getElementById("longitude").value = arr[0].longitude
            document.getElementById("desc").value = arr[0].desc;
            // if (document.getElementById("member").value = arr[0].details == undefined) {
            //     document.getElementById("member").value = arr[0].details = ""
            // }
            // document.getElementById("member").value = arr[0].details.length;

            if (document.getElementById("advLink").value = arr[0].advLink == undefined) {
                document.getElementById("advLink").value = ""
            } else {
                document.getElementById("advLink").value = arr[0].advLink
            }

    
       

            //// button invoked 

        } else {

            invoked1.classList.add("d-none");
            invoked2.classList.replace("d-inline-block", "d-none");
            invoked3.classList.replace("d-inline-block", "d-none")
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
        // let current;
        let detol = []
        // if ("true" == document.getElementById("categoryProject").value)
        //     current = true;
        // else current = false;
        // if (document.getElementById("member").value > 0) {
        //     for (let i = 0; i < document.getElementById("member").value; i++) {
        //         let id = '_' + Math.random().toString(36).substr(2, 9);
        //         let obj = {
        //             id: id,
        //             text: document.getElementById(i).value
        //         }
        //         detol.push(obj)
        //     }
        // };
         
        

        const db = firebase.database().ref().child("Projects").child(id);   
  
   
          
        db.update({
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            status: document.getElementById("status").value,
            current: document.getElementById("categoryProject").value,
            price: document.getElementById("price").value,
            latitude: document.getElementById("latitude").value,
            longitude: document.getElementById("longitude").value,
            desc: document.getElementById("desc").value,
            thePhoto: document.getElementById("zaPhoto").src,
            details: detol,
            photo: currImg,
            imagesDetails:currImgDetails,
            pdf: document.getElementById("namepdf").src.length <60 ?  "" : document.getElementById("namepdf").src  ,
            adv: document.getElementById("advPhoto").src.length <60  ? ""  : document.getElementById("advPhoto").src ,
            advLink: document.getElementById("advLink").value
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

function canBeh(btn, srcs) {

    btn.onclick = function () {
        uClicked(srcs);
    }

}

function uClickedDetails(imgIdDetails) {

    const index = currImgDetails.findIndex(o => {
        return o.id === imgIdDetails
    });
    currImgDetails.splice(index, 1)
    document.getElementById(imgIdDetails).remove();
    document.getElementById(imgIdDetails).remove();

}

function canBasha(btn, srcs) {

    btn.onclick = function () {
        uClickedDetails(srcs);
    }

}










var messagesRef = firebase.database()
.ref('Projects');
console.log(messagesRef);
let arr = [];

messagesRef.once("value", (snapshot) => {
snapshot.forEach((element) => {
    console.log(element.val());
    arr.push(element.val());
    // console.log(arr);
})
arr.map(e => {
    document.getElementById("crud").innerHTML += `

  <tr>
  <td><img width="100" src="${e.thePhoto}" /></td>
  <td>${e.name}</td>
  <td>${e.status}</td>
  <td>${e.category}</td>
  </tr>
`
})


})




