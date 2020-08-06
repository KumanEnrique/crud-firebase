let uid;

const formulario = document.getElementById("formulario-personajes")
const personaje = document.getElementById("personaje")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
//registrar sesion
const fRegistrarse = document.getElementById("registrarse")
const correo = document.getElementById("correo")
const contraseña = document.getElementById("contraseña")
//inciar sesion
const fIniciar = document.getElementById("registrarse")
const iCorreo = document.getElementById("correo")
const iContraseña = document.getElementById("contraseña")
//
const anonimo = document.getElementById("anonimo")
const cerrarSesion = document.getElementById("cerrar sesion")

//evento para ver si estas en sesión
auth.onAuthStateChanged((user)=>{
    if(user){
        console.log("sesion iniciada,objeto user: ", user)
        console.log("objeto user: ", user.email)
        db.collection("personajes").doc(user.uid).get()
            .then(doc => {
                console.log(doc.id, "=>", doc.data())
            })
            .catch(error => {
                console.warn("atrape el error", error)
            });
        
        let personajesRef = db.collection('personajes').doc(user.uid).collection('subcoleccion');
        personajesRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("subcoleción",doc.id, doc.data());
            });
        });
        uid = user.uid
    }else {
        console.log("sesion cerrada")
    }
});
//salir de la sesion
cerrarSesion.addEventListener("click",(e)=>{
    auth.signOut().then(()=>{
        console.log("salio de la  sesión de la aplicación")
    })
    .catch((e)=>{
        console.warn("hubo un error",e)
    })
})
anonimo.addEventListener("click",(e)=>{
    firebase.auth().signInAnonymously().then(() => {
        console.log("estoy en una sesión anonima")
    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("el error fue:",errorCode)
        console.log("el error fue:",errorMessage)
    });
})
function salirSesion(){
    auth.signOut().then(()=>{
        console.log("salio de la  sesión de la aplicación")
    })
    .catch((e)=>{
        console.warn("hubo un error",e)
    })
}
//crear sesion
function crearSesion(){
    auth.createUserWithEmailAndPassword("luis_dohko@hotmail.com", "123456")
        .then(() => {
            console.log("exito!!!")
        })
        .catch((e) => {
            const error = e.code;
            const message = e.message;
            console.warn("atrape el error", error, message)
        });
}
//iniciar sesion
function iniciarSesion() {
    auth.signInWithEmailAndPassword("luis_dohko@hotmail.com", "123456")
        .then(() => {
            console.log("se recordo la contraseña y el password, con exito")
            console.log("luis_dohko@hotmail.com", "654321")
        })
        .catch((e) => {
            const error = e.code;
            const message = e.message;
            console.warn("atrape el error", error, message)
        });
}
//login con google
function loginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
    .then(()=>{
        console.log("estas logueado con google")
    })
    .catch((error)=>{
        console.log(error)
    })
    console.log("logingoogle")
}
function actualizarUsuario(){
    let user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: "maximo decimo meridio",
    photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
        console.log("exito en actualizar los datos")
    }).catch((error) => {
        console.log("atrape el error",error)
    })
}
function enviarMensajeVerificacion() {
    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        console.log("exito en enviar el mensaje")
    }).catch((error) => {
        console.log("atrape el error",error)
    })
}
function enviarMensajeRestablecimiento() {
    var auth = firebase.auth();
    var emailAddress = "luis_dohko@hotmail.com";

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        console.log("envie el restablecimiento de contraseña")
    }).catch((error) => {
        console.log("atrape el error", error)
    })
}
function usuarioAnonimo() {
    firebase.auth().signInAnonymously().then(() => {
        console.log("estoy en una sesión anonima")
    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("el error fue:",errorCode)
        console.log("el error fue:",errorMessage)
    });
}
//
/*          FIN DE AUTH      */
/* let personajesRef = db.collection('personajes').doc(uid).collection('subcoleccion'); */
/* personajesRef.add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
}); */

/* personajesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id,"=>", doc.data());
    });
});  */

/*borrar dato
 personajesRef.doc("one").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
}); */
/* db.collection("cities").doc("DC").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
}); */

/* db.collectionGroup("personajes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id,doc.data());
    });
}); */

/* personajesRef
.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }
    });
}); */

/* mezclar datos
 var cityRef = db.collection('cities').doc('LA');

var setWithMerge = cityRef.set({
    capital: true
}, { merge: true }); */

/* actualizar datos con update
var washingtonRef = db.collection("cities").doc("LA");
washingtonRef.update({
    capital: 155
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
}); */

/* personajesRef.where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
 */
// personajesRef.where("country", "==", "USA").orderBy("population", "asc")
// personajesRef.limit(2)

/* db.collection("cities").orderBy("population").startAt(1000000).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id,"=>",doc.data());
    });
});
db.collection("cities").orderBy("population").endAt(1000000).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id,"=>",doc.data());
    });
}); */