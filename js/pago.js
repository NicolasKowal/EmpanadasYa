let cantidadGuardada;
let ListaEmpanadasPedidas = [];

const GuardarStorage = (array, nombre) => {
	const listaJSON = JSON.stringify(array);
	localStorage.setItem(nombre, listaJSON);
};

const CantidadJSON = localStorage.getItem("precio");
if (CantidadJSON) {
	const Cantidad = JSON.parse(CantidadJSON);
	cantidadGuardada = Cantidad;
}
else{
	cantidadGuardada= 0;
}

const RecuperadoJSON = localStorage.getItem("pedido");
if (RecuperadoJSON) {
	const Recuperado = JSON.parse(RecuperadoJSON);
	Recuperado.forEach((elemento) => {
		ListaEmpanadasPedidas.push(elemento);
	});
}
let precioEmpanada = 1500 * cantidadGuardada;
let ttt = document.querySelector(".ttt");
ttt.textContent = "Total a pagar $  " + precioEmpanada;

let PagoRealizado = document.querySelector("#PagoRealizado");
PagoRealizado.addEventListener("click", () => {
	ListaEmpanadasPedidas = [];
	cantidadGuardada = 0;
	GuardarStorage(ListaEmpanadasPedidas, "pedido");
	GuardarStorage(cantidadGuardada, "precio");
	Swal.fire({
		title: "Tu pedido esta siendo procesado!",
		icon: "success",
		confirmButtonText: "Volver al inicio",
	}).then((resultado) => {
		if (resultado) {
			window.location.href = "../index.html";
		}
	});
});
