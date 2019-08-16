const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    presupuestoRestante( cantidad = 0 ){
        return this.restante -= Number(cantidad);
    }
}

class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');
        presupuestoSpan.innerHTML = cantidad;
        restanteSpan.innerHTML = cantidad;
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if( tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        setTimeout( function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');
        const li = document.createElement('li');
        li.classList = 'list-group-item d-flex justify-content-between align-items-center';        
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad} </span>
        `;
        gastosListado.appendChild(li);
    }
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = presupuestoRestanteUsuario;
        this.comprobarPresupuesto();
    }
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        if( presupuestoTotal / 4 > presupuestoRestante ){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if( presupuestoTotal / 2 > presupuestoRestante ){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){    
    if( presupuestoUsuario === null || presupuestoUsuario === '' || isNaN(Number(presupuestoUsuario)) ){
        window.location.reload();
    }else{
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        const ui = new Interfaz();
        ui.insertarPresupuesto( cantidadPresupuesto.presupuesto );
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    const ui = new Interfaz();
    if( nombreGasto === '' || cantidadGasto === '' || isNaN(Number(cantidadGasto)) ){
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{        
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});
