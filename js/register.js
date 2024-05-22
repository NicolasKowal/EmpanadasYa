let Usuarios = [];

const RecuperadoJSON = localStorage.getItem("clientes");
if (RecuperadoJSON) {
    const Recuperado = JSON.parse(RecuperadoJSON);
    Recuperado.forEach((elemento) => {
        Usuarios.push(elemento);
    });
}
console.log(Usuarios);

fetch("../db/usuarios.json")
    .then((response) => response.json())
    .then((datos) => {
        try {
            datos.forEach((element) => {
                Usuarios.push(element);
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
let parrafoError = document.querySelector("#mostrarError");
let usuario = document.querySelector("#user");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");


btnSubmit.addEventListener("click", () => {
    if (nombre.value && apellido.value && usuario.value && password1.value && password2.value) {
        let validar = validarUsuario(usuario.value);
        if (validar === 0) {
            parrafoError.style.display = "flex";
            parrafoError.textContent = "El usuario ya existe";
        } else {
            if (password1.value != password2.value) {
                parrafoError.style.display = "flex";
                parrafoError.textContent = "Contraseñas distintas";
            } else {
                parrafoError.style.display = "none";
                crearUsuario(usuario.value, password1.value, nombre.value, apellido.value);
                GuardarStorage(Usuarios, "clientes");
                parrafoError.style.display = "flex";
                parrafoError.textContent = "Usuario agregado exitosamente";
            }
        }
    } else {
        parrafoError.style.display = "flex";
        parrafoError.textContent = "Campos incompletos";
        Swal.fire({
            title: 'Faltan completar campos!',
            icon: 'error',
            confirmButtonText: 'Corregir!'
        })
    }
});
