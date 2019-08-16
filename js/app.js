//VARIABLES
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//CLASES
//Clase de Presupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //Método para ir restando del presupuesto actual
    presupuestoRestante( cantidad = 0 ){
        return this.restante -= Number(cantidad);
    }
}

//Clase de Interfaz maneja todo lo relacionado a el HTMl
class Interfaz{
    insertarPresupuesto(cantidad){
        //console.log(cantidad);
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Insertar en el HTMl
        presupuestoSpan.innerHTML = cantidad;
        restanteSpan.innerHTML = cantidad;
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert'); //Clases de Bootstrap
        if( tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));

        //Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el alert después de 3 segundos
        setTimeout( function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
}

//EVENT LISTENER
document.addEventListener('DOMContentLoaded', function(){    
    if( presupuestoUsuario === null || presupuestoUsuario === '' || isNaN(Number(presupuestoUsuario)) ){
        window.location.reload();
    }else{
        //Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //console.log(cantidadPresupuesto);
        
        //Instanciar la clase de Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto( cantidadPresupuesto.presupuesto );
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //console.log('Enviado...');

    //Leer del formulario de Gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    console.log(nombreGasto, cantidadGasto);

    const ui = new Interfaz();

    //Comprobar que los campos no esten vacios
    if( nombreGasto === '' || cantidadGasto === '' || isNaN(Number(cantidadGasto)) ){
        //console.log('Hubo un error');
        //2 parámetros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{
        console.log('El gasto se agrego');
    }
});

