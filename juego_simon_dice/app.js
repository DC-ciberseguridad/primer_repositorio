//repositorio del curso "https://github.com/gsuscastellanosSC/FundamentosavaScript/tree/master/Juego"

const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

const ULTIMO_NIVEL = 10

//aqui esta toda la logica del viodeo juego
class Juego{

    constructor(){

        this.inicializar = this.inicializar.bind(this) 
        this.inicializar()
        this.generarSecuencia()

        setTimeout(this.siguienteNivel, 500)

    }

    inicializar(){

        this.siguienteNivel = this.siguienteNivel.bind(this)  
        this.elegirColor = this.elegirColor.bind(this)
        this.volverbtnEmpezar()
        btnEmpezar.classList.add('hide') 

        this.nivel = 1
        this.colores = {

            celeste,
            violeta,
            naranja,
            verde
        }
    }

    volverbtnEmpezar(){

      if(btnEmpezar.classList.contains('Hide')){

        btnEmpezar.classList.remove('Hide')

      }else{

        btnEmpezar.classList.add('Hide')
      }
    }

    //Generando una secuencia de números
    generarSecuencia(){

        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random) * 4)
        //Math.floor redondea decimales
        //Math.random genera numeros aleatorios entre 0 y 1

    }

    siguienteNivel(){

        this.subnivel = 0
        this.nombreAtributo = 'valor'
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAcolor(numero){

        switch(numero){

            case 0:

                return 'celeste'

            case 1:
                
                return 'violeta'

            case 2:
                
                return 'naranja'

            case 3:
                
                return 'verde'
        }

    }
    transformarColorAnumero(numero){

      switch(numero){

        case 'celeste':

          return 0

        case 'violeta':
        
          return 1 

        case 'naranja':
        
          return 2 

        case 'verde':
        
          return 3 
  }

}
    iluminarSecuencia(){

        for(let i=0; i< this.nivel; i++){

            const color = this.transformarNumeroAcolor(this.secuencia[i])
            
            setTimeout(() => {this.iluminarColor(color)}, 1000 * i)

            /* 
            1000 * 0 = 0 (se ilumina de inmediato)
            1000 * 1 = 1000(se ilumina 1 segundo despues)
            1000 * 2 = 2000(se ilumina 2 segundos despues)
            1000 * 3 = 3000(se ilumina 3 segundos despues) 
            */
            
        }
    }

    iluminarColor(color){

        this.colores[color].classList.add('light')
        
        setTimeout(()=> this.apagarColor(color), 350)
    }

    apagarColor(color){

        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        //eventos

        this.colores.celeste.addEventListener('click', this.elegirColor )
        this.colores.violeta.addEventListener('click', this.elegirColor )
        this.colores.naranja.addEventListener('click', this.elegirColor )
        this.colores.verde.addEventListener('click', this.elegirColor )

      //.addEventListener('click'), le indica al navegador que debe ejecutar al momento de dar click
    }

    eliminarEventosClick(){

      this.colores.celeste.removeEventListener('click', this.elegirColor )
      this.colores.violeta.removeEventListener('click', this.elegirColor )
      this.colores.naranja.removeEventListener('click', this.elegirColor )
      this.colores.verde.removeEventListener('click', this.elegirColor )
    }

    elegirColor(ev){

      const nombreColor = ev.target.dataset.color
      const numeroColor = this.transformarColorAnumero(nombreColor)  
      this.iluminarColor(nombreColor)

      //fubcion para vereficar si el usuario elije bien
      if(numeroColor === this.secuencia[this.subnivel]){

        //si el usuario elije bien, se incrementa el subnivel

        this.subnivel++

        if(this.subnivel === this.nivel){

          //si esto sucede el usuario pasa de nivel

          this.nivel++

          //si el usuario pasa de nivel, ya no deberia poder llamar eventos click

           this.eliminarEventosClick()
           
           //si el usuario pasa de nivel puden pasar dos cosas

           if (this.nivel === (ULTIMO_NIVEL + 1)){
            //gano

            this.ganoElJuego() 

           }else {
             setTimeout(this.siguienteNivel, 1500) 
            /*solo hace una referencia al metodo 'siguienteNivel', no se esta invocando 
            'siguienteNivel()'. Solo se esta indicanco el metodo a llamar*/ 
            }

          }

        }else{
        //perdio

        this.perdioElJuego()
      }
    }

    ganoElJuego(){

      swal('felicitaciones, ganaste el juego', 'success')
      //swal devuelve una promesa
      
      .then(() => {this.inicializar()})
    }

    perdioElJuego(){

      swal('A perdido el juego', 'error')
      //swal devuelve una promesa

      .then(() => {

      this.eliminarEventosClick()
      this.inicializar()

    })
  }
}

const empezarJuego =() => window.juego = new Juego()

