const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 2;

class Juego {
    constructor() {
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
    }
    
    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor=this.elegirColor.bind(this);
        this.volverEmpezar();
        this.level = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    volverEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else{
            btnEmpezar.classList.add('hide');
        }

    }

    generarSecuencia (){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4));
    }

    siguienteNivel (){
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(numero){
        switch (numero){
            case 0:
                console.log(`celeste`);
                return'celeste';
            case 1:
                console.log(`violeta`);
                return'violeta';
            case 2:
                console.log(`naranja`);
                return'naranja';
            case 3:
                console.log(`verde`);
                return'verde';
        }
    }

    transformarColorAnumero(color){
        switch (color){
            case'celeste':
                return 0;
            case'violeta':
                return 1;
            case'naranja':
                return 2;
            case'verde':
                return 3;
        }
    }

    iluminarSecuencia (){
        for(let i=0; i < this.level; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => {this.iluminarColor(color)}, 1000 * i);
        }
    }

    iluminarColor(color){

        this.colores[color].classList.add('light');
        setTimeout(()=> this.apagarColor(color), 350);
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorAnumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor===this.secuencia[this.subnivel]){
           this.subnivel++;
           if(this.subnivel===this.level){
                this.level++;
                this.eliminarEventosClick();
                if (this.level ===(ULTIMO_NIVEL + 1)){
                    this.ganoElJuego();
                }else{
                  setTimeout(this.siguienteNivel(), 1500);  
                }
            }
        }else{
            this.perdioElJuego();
        }
        
       
        //console.log(`${nombreColor} ${numeroColor}`);
    }

    ganoElJuego(){
        swal('Ganaste!', 'Felictaciones!', 'success')
        .then(this.inicializar());
    }

    perdioElJuego(){
        swal('Perdiste', ':(', 'error')
        .then(()=>{
            this.eliminarEventosClick();
            this.inicializar();
        })
    }
    
}
   
const empezarJuego =() => window.juego = new Juego();
