//VARIABLES
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');
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

//EVENT LISTENER
document.addEventListener('DOMContentLoaded', function(){    
    if( presupuestoUsuario === null || presupuestoUsuario === '' || isNaN(Number(presupuestoUsuario)) ){
        window.location.reload();
    }else{
        //Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        console.log(cantidadPresupuesto);
    }
});

