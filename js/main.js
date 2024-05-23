const empanadas = [
	{ tipo: "vegetarianas", empanada: "Española" },
	{ tipo: "vegetarianas", empanada: "Capresse" },
	{ tipo: "vegetarianas", empanada: "Verduras al horno" },
	{ tipo: "vegetarianas", empanada: "Caponata" },
	{ tipo: "vegetarianas", empanada: "Brócoli y queso azul" },
	{ tipo: "vegetarianas", empanada: "Calabaza asada" },
	{ tipo: "vegetarianas", empanada: "Champiñones a la provenzal" },
	{ tipo: "vegetarianas", empanada: "Hongos y espinaca" },
	{ tipo: "vegetarianas", empanada: "Queso y cebolla caramelizada" },
	{ tipo: "vegetarianas", empanada: "Ratatuille" },
	{ tipo: "veganas", empanada: "Berenjena y pimiento" },
	{ tipo: "veganas", empanada: "Espárragos y tofu" },
	{ tipo: "veganas", empanada: "Hongos y cebolla caramelizada" },
	{ tipo: "veganas", empanada: "Papas al curry" },
	{ tipo: "veganas", empanada: "Brócoli y tofu ahumado" },
	{ tipo: "veganas", empanada: "Calabaza y maíz" },
	{ tipo: "veganas", empanada: "Aceitunas y tomate seco" },
	{ tipo: "veganas", empanada: "Alcachofa y espinaca" },
	{ tipo: "veganas", empanada: "Lentejas y cebolla caramelizada" },
	{ tipo: "veganas", empanada: "Zapallo italiano y berenjena" },
];
let ListaEmpanadasPedidas = [];

class Empanada {
	constructor(tipo, cantidad) {
		this.tipo = tipo;
		this.cantidad = cantidad;
	}
}
function Cookies() {
	const pantalla = document.querySelector(".tomarPantalla");
	pantalla.style.display = "flex";
	const boton = document.querySelector("#cerrarCookie");
	boton.addEventListener("click", () => (pantalla.style.display = "none"));
}
setTimeout(Cookies, 2000);

function MostrarLaHora() {
	const time = document.querySelector("#time");
	let laHora = document.createElement("p");
	let laHoraDeEntrega = document.createElement("p");
	time.appendChild(laHora);
	time.appendChild(laHoraDeEntrega);
	const opciones = { hour: "2-digit", minute: "2-digit", hour12: false };
	const Actualizar = () => {
		const ahora = new Date();
		const en30 = new Date(ahora.getTime() + 30 * 60000);
		const horaYMinutos = ahora.toLocaleTimeString(undefined, opciones);
		laHora.textContent = "Hora actual: " + horaYMinutos;
		const horaEntrega = en30.toLocaleTimeString(undefined, opciones);
		laHoraDeEntrega.textContent = "Hora aproximada de entrega: " + horaEntrega;
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
	parrafo.textContent = "$ " + precioEmpanada * cantidadGuardada;
	boton.disabled = cantidadGuardada === 0;


	const GuardarStorage = (array, nombre) => {
		const listaJSON = JSON.stringify(array);
		localStorage.setItem(nombre, listaJSON);
	};
	function GenerarListaPedida(lista, div) {
		div.innerHTML = "";
		lista.forEach((element) => {
			let nuevoElemento = document.createElement("h4");
			nuevoElemento.innerText = element.tipo;
			let nuevaCantidad = document.createElement("p");
			nuevaCantidad.innerText = element.cantidad;
			let nuevoLI = document.createElement("li");
			nuevoLI.appendChild(nuevoElemento);
			nuevoLI.appendChild(nuevaCantidad);
			div.appendChild(nuevoLI);
		});
	}
	function GenerarLista(lista, div) {
		div.innerHTML = "";
		lista.forEach((element) => {
			let nuevoElemento = document.createElement("h4");
			nuevoElemento.innerText = element.empanada;
			let nuevoBotonMas = document.createElement("button");
			nuevoBotonMas.innerText = "+";
			let nuevoBotonMenos = document.createElement("button");
			nuevoBotonMenos.innerText = "-";
			let nuevoLI = document.createElement("li");
			let nuevoTotal = document.createElement("p");
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
			let empanadaFiltro = empanadas.filter(
				(empanada) => empanada.tipo == "vegetarianas"
			);
			GenerarLista(empanadaFiltro, Gustos);
		});
		botonVegana.addEventListener("click", () => {
			let empanadaFiltro = empanadas.filter(
				(empanada) => empanada.tipo == "veganas"
			);
			GenerarLista(empanadaFiltro, Gustos);
		});
	}

	Botonera();
	GenerarListaPedida(ListaEmpanadasPedidas, mostrarPedido);
}

Empanadas();
