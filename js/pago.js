const precioEmpanada = 1500;
let cantidadGuardada;

const CantidadJSON = localStorage.getItem("precio");
if (CantidadJSON) {
    const Cantidad = JSON.parse(CantidadJSON);
    cantidadGuardada = Cantidad;
}

let ttt = document.querySelector(".ttt");
ttt.textContent =  "Total a pagar $  " + precioEmpanada * cantidadGuardada;

let PagoRealizado = document.querySelector("#PagoRealizado");
PagoRealizado.addEventListener("click", ()=>{
    
})