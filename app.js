let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento,texto){
    //creamos la variable elemento html y con el metodo query selector selecionamos el parametro elemento el cual en este caso
    //es el titulo del juego el cual es un h1 del archivo html
    let elementoHTML = document.querySelector(elemento);
    //con el metodo innerHTML selecionamos el siguiente parametro el cual en este caso es el parrafo del archivo html
    elementoHTML.innerHTML = texto;
    return;
}

//esta funcion convierte un string a numero y obtine el valor del formulario que es obtiene desde el archivo html 
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    
    if(numeroDeUsuario === numeroSecreto){
        //aca comprobamos si el numero secreto es el correcto le decimos al usurio que gano
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        //tambien cuando gane se habilita le boton de reiniciar el juego
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        //esta condicion es una ayuda al usuario para saber si esta cerca del numero o no 
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El numero secreto es menor');
        }else{
            asignarTextoElemento('p','El numero secreto es mayor');
        }
        //el contador para los intentos
        intentos++;
        limpiarCaja();
    }
    return;
};

//funcion para limpiar el formulario al obturar el boton de intentar
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

//funcion para obtener un numero aleatorio
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1; 

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    }else{
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del Número secreto!!!!');
    asignarTextoElemento('p',`adivina el numero entre 1 y ${numeroMaximo}!!!!`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de numeros
    condicionesIniciales();
    //generar el numero aleatorio
    //deshabilitar el boton de nuevo juego
    condicionesIniciales();
    //inicializar el numero de intentos
    document.querySelector('#reiniciar').setAttribute('disabled','true');

}

//llamado de funciones para cambiar tanto el titulo del juego como el texto que aparece al iniciar
condicionesIniciales();