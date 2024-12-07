let ListaEmpanadasPedidas = [];
let saboresDeEmpanadas = [];

class Empanada {
	constructor(tipo, cantidad) {
		this.tipo = tipo;
		this.cantidad = cantidad;
	}
}

fetch(
	"https://raw.githubusercontent.com/NicolasKowal/EmpanadasYa/main/db/gustos.json"
)
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then((datos) => {
		console.log("Datos cargados correctamente:", datos);
		saboresDeEmpanadas = datos;
		GenerarLista(saboresDeEmpanadas, Gustos);
	})
	.catch((error) => {
		console.error("Error en el fetch:", error);
	});

function Cookies() {
	const pantalla = document.querySelector(".tomarPantalla");
	pantalla.style.display = "flex";
	const boton = document.querySelector("#cerrarCookie");
	boton.addEventListener("click", () => (pantalla.style.display = "none"));
}
setTimeout(Cookies, 1500);

function MostrarLaHora() {
	const time = document.querySelector("#time");
	if (!time) {
		console.error("El elemento con id 'time' no se encuentra en el DOM.");
		return;
	}
	let laHora = document.createElement("p");
	laHora.classList.add("col-6");
	let laHoraDeEntrega = document.createElement("p");
	laHoraDeEntrega.classList.add("col-6");
	time.appendChild(laHora);
	time.appendChild(laHoraDeEntrega);

	const opciones = { hour: "2-digit", minute: "2-digit", hour12: false };
	const Actualizar = () => {
		const ahora = new Date();
		const en30 = new Date(ahora.getTime() + 30 * 60000);
		laHora.textContent =
			"Hora actual: " + ahora.toLocaleTimeString(undefined, opciones);
		laHoraDeEntrega.textContent =
			"Hora aproximada de entrega: " +
			en30.toLocaleTimeString(undefined, opciones);
	};
	setInterval(Actualizar, 1000);
}
MostrarLaHora();

function Empanadas() {
	const precioEmpanada = 1500;
	let cantidadGuardada;

	const CantidadJSON = localStorage.getItem("precio");
	if (CantidadJSON) {
		const Cantidad = JSON.parse(CantidadJSON);
		cantidadGuardada = Cantidad;
	}

	const RecuperadoJSON = localStorage.getItem("pedido");
	if (RecuperadoJSON) {
		const Recuperado = JSON.parse(RecuperadoJSON);
		Recuperado.forEach((elemento) => {
			ListaEmpanadasPedidas.push(elemento);
		});
	}

	let Gustos = document.querySelector("#gustos");
	let mostrarPedido = document.querySelector("#pedido");
	let boton = document.querySelector("#next");
	let parrafo = document.querySelector("#total");
	cantidadGuardada = 1500 * cantidadGuardada;
	parrafo.textContent = "$ " + cantidadGuardada;
	boton.disabled = cantidadGuardada === 0;

	const GuardarStorage = (array, nombre) => {
		const listaJSON = JSON.stringify(array);
		localStorage.setItem(nombre, listaJSON);
	};
	function GenerarListaPedida(lista, div) {
		div.innerHTML = "";
		lista.forEach((element) => {
			let nuevoElemento = document.createElement("h4");
			nuevoElemento.classList.add("col-10");
			nuevoElemento.innerText = element.tipo;
			let nuevaCantidad = document.createElement("p");
			nuevaCantidad.classList.add("col-2");
			nuevaCantidad.innerText = element.cantidad;
			let nuevoLI = document.createElement("li");
			nuevoLI.classList.add("col");
			nuevoLI.appendChild(nuevoElemento);
			nuevoLI.appendChild(nuevaCantidad);
			div.appendChild(nuevoLI);
		});
	}
	function GenerarLista(lista, div) {
		div.innerHTML = "";
		lista.forEach((element) => {
			let nuevoElemento = document.createElement("h4");
			nuevoElemento.classList.add("col-8");
			nuevoElemento.innerText = element.empanada;
			let nuevoBotonMas = document.createElement("button");
			nuevoBotonMas.classList.add("col-1");
			nuevoBotonMas.innerText = "+";
			let nuevoBotonMenos = document.createElement("button");
			nuevoBotonMenos.classList.add("col-1");
			nuevoBotonMenos.innerText = "-";
			let nuevoLI = document.createElement("li");
			nuevoLI.classList.add("col");
			let nuevoTotal = document.createElement("p");
			nuevoTotal.classList.add("col-2");
			nuevoTotal.innerText = "0";
			let total = 0;
			ListaEmpanadasPedidas.forEach((i) => {
				if (i.tipo.toLowerCase() === element.empanada.toLowerCase()) {
					nuevoTotal.innerText = i.cantidad;
					total = nuevoTotal.innerText;
				}
			});
			nuevoLI.appendChild(nuevoElemento);
			nuevoLI.appendChild(nuevoBotonMenos);
			nuevoLI.appendChild(nuevoTotal);
			nuevoLI.appendChild(nuevoBotonMas);
			div.appendChild(nuevoLI);
			nuevoBotonMas.addEventListener("click", () => {
				total = parseInt(nuevoTotal.innerText) + 1;
				nuevoTotal.innerText = total;
				let snich = ListaEmpanadasPedidas.findIndex(
					(elemento) => elemento.tipo === nuevoElemento.innerText
				);
				if (snich == -1) {
					ListaEmpanadasPedidas.push(
						new Empanada(nuevoElemento.innerText, total)
					);
				} else {
					ListaEmpanadasPedidas[snich].cantidad = total;
				}
				GuardarStorage(ListaEmpanadasPedidas, "pedido");
				let valorTotal = ListaEmpanadasPedidas.reduce(
					(total, element) => total + element.cantidad,
					0
				);
				GuardarStorage(valorTotal, "precio");
				parrafo.innerText = "$ " + precioEmpanada * valorTotal;
				GenerarListaPedida(ListaEmpanadasPedidas, mostrarPedido);
				if (valorTotal === 0) {
					boton.disabled = true;
				} else {
					boton.disabled = false;
				}
			});
			nuevoBotonMenos.addEventListener("click", () => {
				if (total > 0) {
					total -= 1;
					nuevoTotal.innerText = total;
					let snich = ListaEmpanadasPedidas.findIndex(
						(elemento) => elemento.tipo === nuevoElemento.innerText
					);
					if (snich === -1) {
						ListaEmpanadasPedidas.push(
							new Empanada(nuevoElemento.innerText, total)
						);
					}
					if (total === 0) {
						ListaEmpanadasPedidas.splice(snich, 1);
						GenerarListaPedida(ListaEmpanadasPedidas, mostrarPedido);
					} else {
						ListaEmpanadasPedidas[snich].cantidad = total;
						GenerarListaPedida(ListaEmpanadasPedidas, mostrarPedido);
					}
					GuardarStorage(ListaEmpanadasPedidas, "pedido");
					let valorTotal = ListaEmpanadasPedidas.reduce(
						(total, element) => total + element.cantidad,
						0
					);
					GuardarStorage(valorTotal, "precio");
					parrafo.innerText = "$ " + precioEmpanada * valorTotal;
					if (valorTotal === 0) {
						boton.disabled = true;
					} else {
						boton.disabled = false;
					}
				}
			});
		});
	}
	function Botonera() {
		let botonVegeta = document.querySelector("#botonVegeta");
		let botonVegana = document.querySelector("#botonVegana");

		botonVegeta.addEventListener("click", () => {
			let empanadaFiltro = saboresDeEmpanadas.filter(
				(empanada) => empanada.tipo == "vegetarianas"
			);
			GenerarLista(empanadaFiltro, Gustos);
		});
		botonVegana.addEventListener("click", () => {
			let empanadaFiltro = saboresDeEmpanadas.filter(
				(empanada) => empanada.tipo == "veganas"
			);
			GenerarLista(empanadaFiltro, Gustos);
		});
	}

	Botonera();
	GenerarListaPedida(ListaEmpanadasPedidas, mostrarPedido);
}

Empanadas();
