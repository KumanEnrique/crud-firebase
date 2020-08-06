let uid;

const contenedor = document.getElementById("contenedor")
const autenticado = document.getElementById("autenticado")
const formulario = document.getElementById("fPersonajes")
const personaje = document.getElementById("personaje")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
//registrar sesion
const fRegistrarse = document.getElementById("fRegistrarse")
const rCorreo = document.getElementById("rCorreo")
const rContraseña = document.getElementById("rContraseña")
const registraseGoogle = document.getElementById("registraseGoogle")
//inciar sesion
const fIniciar = document.getElementById("fIniciarSesion")
const iCorreo = document.getElementById("iCorreo")
const iContraseña = document.getElementById("iContraseña")
const iniciarGoogle = document.getElementById("iniciarGoogle")
//
const anonimo = document.getElementById("anonimo")
const cerrarSesion = document.getElementById("cerrarSesion")
const navSesion = document.getElementById("navSesion")
const navRegistrarse = document.getElementById("navRegistrarse")
//
const fActualizar = document.getElementById("fActualizar")
const aPersonaje = document.getElementById("aPersonaje")
const aNombre = document.getElementById("aNombre")
const aApellido = document.getElementById("aApellido")
const labelId = document.getElementById("labelId")

//evento para ver si estas en sesión
auth.onAuthStateChanged((user)=>{
    if(user){
        sesionIniciada(user)
        cerrarSesion.style.display = "block"
        autenticado.style.display = "block"

        navSesion.style.display = "none"
        navRegistrarse.style.display = "none"
    }else {
        console.log("sesion cerrada")
        cerrarSesion.style.display = "none"
        autenticado.style.display = "none"

        navSesion.style.display = "block"
        navRegistrarse.style.display = "block"
        contenedor.innerHTML = ""
    }
});
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
        $("#registrarseModal").modal('hide')
    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("el error fue:",errorCode)
        console.log("el error fue:",errorMessage)
    });
})
registraseGoogle.addEventListener("click",(e)=>{
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
    .then(()=>{
        console.log("estas logueado con google")
        $("#registrarseModal").modal('hide')
    })
    .catch((error)=>{
        console.log(error)
    })
})
iniciarGoogle.addEventListener("click",(e)=>{
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
    .then(()=>{
        console.log("estas logueado con google")
        $("iniciarSesionModal").modal('hide')
    })
    .catch((error)=>{
        console.log(error)
    })
})
fRegistrarse.addEventListener("submit",(e)=>{
    e.preventDefault()
    const correo = rCorreo.value;
    const contraseña = rContraseña.value;
    auth.createUserWithEmailAndPassword(correo, contraseña)
        .then(() => {
            console.log("exito!!!")
            $("#registrarseModal").modal('hide')
            fRegistrarse.reset()
        })
        .catch((e) => {
            const error = e.code;
            const message = e.message;
            console.warn("atrape el error", error, message)
        });
})
fIniciar.addEventListener("submit",(e)=>{
    e.preventDefault()
    const correo = iCorreo.value;
    const contraseña = iContraseña.value;
    auth.signInWithEmailAndPassword(correo, contraseña)
        .then(() => {
            console.log("se recordo la contraseña y el password, con exito")
            $("#iniciarSesionModal").modal('hide')
            fIniciar.reset();
        })
        .catch((e) => {
            const error = e.code;
            const message = e.message;
            console.warn("atrape el error", error, message)
        });
})
function sesionIniciada(user){
    console.log("sesion iniciada,objeto user: ", user)
        console.log("objeto user: ", user.email)
        db.collection("personajes").doc(user.uid).get()
            .then(doc => {
                console.log(doc.id, "=>", doc.data())
            })
            .catch(error => {
                console.warn("atrape el error", error)
            });
        
            uid = user.uid
            verSiempre()
}
//funciones
{
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
}
/*          FIN DE AUTH      */

function verSiempre(){
    const personajesRef = db.collection('personajes').doc(uid).collection('subcoleccion')
    personajesRef.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
                agregar(change.doc)
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
                const temp = document.getElementById(change.doc.id)
                // console.log(temp)
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    })
}
function agregar(doc){
    const {nombre,personaje,apellido} = doc.data()
    const columna = document.createElement("div")
    columna.className = "col-lg-6 col-md-6 col-sm-12 my-3"
    columna.id = doc.id
    columna.innerHTML = `
    <div class="card">
        <div class="card-header">${personaje}</div>
        <div class="card-body">${nombre}:${apellido}</div>
        <div class="card-footer">
            <button class="btn-warning" type="button" data-toggle="modal" data-target="#actualizarModal">Actualizar</button>
            <button class="btn-danger" type="button">Eliminar</button>
        </div>
    </div>
    `
    contenedor.appendChild(columna)
}
function eliminar(id){
    const personajesRef = db.collection('personajes').doc(uid).collection('subcoleccion');
    personajesRef.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
function actualizar(e){
    labelId.textContent = e.target.parentElement.parentElement.parentElement.id
    aPersonaje.value = e.target.parentElement.parentElement.children[0].textContent
    let tempo = e.target.parentElement.parentElement.children[1].textContent
    let tempo2 = tempo.indexOf(":")
    aNombre.value = tempo.slice(0,tempo2)
    aApellido.value = tempo.slice(tempo2 + 1)
}
function actualizarUI(id){
    const columna = document.getElementById(id)
    columna.innerHTML = `
    <div class="card">
        <div class="card-header">${aPersonaje.value}</div>
        <div class="card-body">${aNombre.value}:${aApellido.value}</div>
        <div class="card-footer">
            <button class="btn-warning" type="button" data-toggle="modal" data-target="#actualizarModal">Actualizar</button>
            <button class="btn-danger" type="button">Eliminar</button>
        </div>
    </div>
    `
}
formulario.addEventListener("submit",(e)=>{
    e.preventDefault()
    const p = personaje.value;
    const n = nombre.value;
    const a = apellido.value;

    const personajesRef = db.collection('personajes').doc(uid).collection('subcoleccion');
    personajesRef.add({
        personaje: p,
        nombre: n,
        apellido: a
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            formulario.reset()
            personaje.focus()
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
})
contenedor.addEventListener("click",(e)=>{
    if(e.target.textContent == "Eliminar"){
        eliminar(e.target.parentElement.parentElement.parentElement.id)
        e.target.parentElement.parentElement.parentElement.remove()
    }else if(e.target.textContent == "Actualizar"){
        actualizar(e)
    }
})
fActualizar.addEventListener("submit", (e) => {
    e.preventDefault()
    const id = labelId.textContent
    const personajesRef = db.collection('personajes').doc(uid).collection('subcoleccion').doc(id)
    personajesRef.update({
        personaje: aPersonaje.value,
        nombre: aNombre.value,
        apellido: aApellido.value
    })
        .then(function () {
            console.log("Document successfully updated!");
            $("#actualizarModal").modal("hide")
            actualizarUI(id)
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        })
})
{
    /* personajesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id,"=>", doc.data());
    });
});  */

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
}
