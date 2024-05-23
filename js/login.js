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

const buscarUsuario = function (usuario) {
	return Usuarios.findIndex((element) => element.user === usuario);
};

const validarContraseña = function (valor, contraseña) {
	if (Usuarios[valor].password === contraseña) {
		return 1;
	} else {
		return 0;
	}
};

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

let usuarioLogueado = false;
let textboxUser = document.querySelector("#userId");
let textboxPass = document.querySelector("#passId");
let btnIngreso = document.querySelector("#ingresar");
let btnRegistro = document.querySelector("#registro");
let parrafoError = document.querySelector("#mostrarError");
parrafoError.textContent = "error a mostrar";

btnIngreso.addEventListener("click", () => {
	if (textboxUser.value && textboxPass.value) {
		let usuarioIndexado = buscarUsuario(textboxUser.value);
		if (usuarioIndexado != -1) {
			let contraseñaIndexada = validarContraseña(
				usuarioIndexado,
				textboxPass.value
			);
			if (contraseñaIndexada) {
				window.location.href = "./pago.html";
			} else {
				parrafoError.style.display = "flex";
				parrafoError.textContent = "contraseña erronea";
			}
		} else {
			parrafoError.style.display = "flex";
			parrafoError.textContent = "usuario inexistente";
		}
	} else {
		parrafoError.style.display = "flex";
		parrafoError.textContent = "campos vacios";
	}
});
