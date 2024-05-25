document.addEventListener("DOMContentLoaded", () => {

let Usuarios = [];

const RecuperadoJSON = localStorage.getItem("clientes");
if (RecuperadoJSON) {
    const Recuperado = JSON.parse(RecuperadoJSON);
    Recuperado.forEach((elemento) => {
        Usuarios.push(elemento);
    });
}

fetch("../db/usuarios.json")
    .then((response) => response.json())
    .then((datos) => {
        try {
            datos.forEach((element) => {
                if(!(datos.find((obj)=> obj ==element))){
                        Usuarios.push(element);
                    }
            });
        } catch (error) {
            console.error("Error cargando los datos", error);
        }
    })
    .catch((error) => {
        console.error("Error al levantar el archivo", error);
    });


    console.log(Usuarios);

const validarUsuario = function (nombre) {
    for (const element of Usuarios) {
        if (element.user === nombre) {
            return 0;
        }
    }
    return 1;
};

const crearUsuario = (usuario, contraseña, nombre, apellido) => {
    Usuarios.push({ user: usuario, password: contraseña, nombre, apellido });
};

const GuardarStorage = (array, nombre) => {
    const listaJSON = JSON.stringify(array);
    localStorage.setItem(nombre, listaJSON);
};

let btnSubmit = document.querySelector("#submitt");
let password1 = document.querySelector("#password1");
let password2 = document.querySelector("#password2");
let usuario = document.querySelector("#user");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");


btnSubmit.addEventListener("click", () => {
    if (nombre.value!="" && apellido.value!="" && usuario.value!="" && password1.value!="" && password2.value!="") {
        let validar = validarUsuario(usuario.value);
        if (validar === 0) {
            Swal.fire({
                title: 'El usuario ya existe!',
                icon: 'error',
                confirmButtonText: 'Corregir!'
            });
        } else {
            if (password1.value != password2.value) {
                Swal.fire({
                    title: 'Contraseñas distintas!',
                    icon: 'error',
                    confirmButtonText: 'Corregir!'
                });
            } else {

                crearUsuario(usuario.value, password1.value, nombre.value, apellido.value);
                GuardarStorage(Usuarios, "clientes");
                Swal.fire({
                    title: 'Usuario agregado exitosamente!',
                    icon: 'success',
                    confirmButtonText: 'Corregir!'
                });
            }
        }
    } else {
        Swal.fire({
            title: 'Faltan completar campos!',
            icon: 'error',
            confirmButtonText: 'Corregir!'
        });
    }
});
});