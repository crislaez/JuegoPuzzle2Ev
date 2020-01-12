'use strcit';

function inicio(){
    var arrayImagenes = ['charmander','squirtle','bulbasaur','pikachu','eevee','cindaquil','totodile','chicorita','riolu','larvitar'];
    var segundos = 0;
    var minutos = 0;
    var movimiento = 0;
    var section = $('section');
    var td,valorSelect,tabla,tdprimerClick,tdSegundoClick;
    var contadorVictoria = 0;
    var comprobarPrimeraImagen = null;
    var comprobarSegundaImagen = null;   
    var selec = $('#seleccion');
    var boton = $('#boton');         
    boton.click(clickCrearTabla);      

    //funcion que crea la tabla
    function crearTabla(valor){
        let aux = valor.split('x');
        let num1 = parseInt(aux[0]);
        let num2 = parseInt(aux[1]);
        let contador = 1;
        tabla = `<table id='tabla' border='1'>`;
        for(i=0; i<num2; i++){
            tabla += `<tr>`;
            for(j=0; j<num1; j++){
                tabla += `<td id='td_${contador}'><img src='' alt=''></td>`;
                contador++;
            }
            tabla += `</tr>`;
        }
        tabla += "</table>";
        section.append(tabla);
    }

    //funcion cuando hagas click en el boton de tablero
    function clickCrearTabla(){
        $(this).prop('disabled', true);
        selec.prop('disabled', true);
        alert('Tienes 5 segundos para memorizar las imagenes, luego desapareceran');
        valorSelect = selec.val()
        crearTabla(valorSelect);
        td = document.getElementsByTagName('td');   
        rellenarTablaAleatoria();    
        cronometro(); 
    }

    //funcion para rellenar al tabla con imagenes aleatoriamente
    function rellenarTablaAleatoria(){
        let imagenes = arrayImagenes.sort(function () { return Math.random() - 0.5 });
        let arrayPrueba = imagenes.slice(0,(td.length/2))
        let ims = arrayPrueba.concat(arrayPrueba);
        ims = ims.sort(function () { return Math.random() - 0.5 });
        for(let i=0; i<td.length; i++){
            let im = td[i].getElementsByTagName('img');
            im[0].src = `images/${ims[i]}.png`;
            im[0].alt = ims[i];
        } 
      } 

    //funcion para cunado hagamos click en uno d elos td
    function verTd(){
        let im = this.getElementsByTagName('img');
   
        if(comprobarPrimeraImagen == null){
            aparecerImagenes(im[0]);
            comprobarPrimeraImagen = im[0];
            tdprimerClick = this;
        }else{
            contadorMovimiento();
            tdSegundoClick = this;
            comprobarSegundaImagen = im[0];

            if(tdSegundoClick != tdprimerClick){
                aparecerImagenes(im[0]); 
                if(comprobarPrimeraImagen.alt == comprobarSegundaImagen.alt){
                    contadorVictoria++;
                    removerEvento(tdprimerClick,tdSegundoClick);
                    comprobarVictoria();
                }else{
                    alert('No');
                    ocultarImagenes(im[0]);
                    ocultarImagenes(comprobarPrimeraImagen);
                }             
            }else{
                ocultarImagenes(im[0]);
            }                  
            comprobarPrimeraImagen=null;   
        }        
    }

    //funcion para remover los eventos
    function removerEvento(tdEventoUno,tdEventoDos){
        tdEventoUno.removeEventListener('click',verTd, false);
        tdEventoDos.removeEventListener('click',verTd, false);
    }

    //funcion para el cronometro
    function cronometro(){
        setInterval(function(){         
            segundos ++;
            if(segundos < 10){                
                rellenarCronometro(1);
            }else if(segundos >= 10 && segundos < 60){
                rellenarCronometro(2);
            }else if(segundos == 60){
                segundos = 0;
                minutos ++;
                rellenarCronometro(1);  
            }           

            if($('#parrafoUno').html() == 'TIEMPO: 00:05'){             
                let im = document.getElementsByTagName('img');
                for(let valor of im){
                    ocultarImagenes(valor);
                    asignarEventos();
                }
            }
        },1000);
    }

    //funcion para rellenar el cronometro dependiendo del contador del minuto
    function rellenarCronometro(num){
        if(minutos < 9){
            if(num == 1){
                $('#parrafoUno').html(`TIEMPO: 0${minutos}:0${segundos}`);
            }else{
                $('#parrafoUno').html(`TIEMPO: 0${minutos}:${segundos}`);
            }            
        }else{
            if(num == 1){
                $('#parrafoUno').html(`TIEMPO: ${minutos}:0${segundos}`);
            }else{
                $('#parrafoUno').html(`TIEMPO: ${minutos}:${segundos}`);
            }            
        }
    }

    //funcion para asignar los eventos a los td
    function asignarEventos(){
        for(let valor of td){        
            valor.addEventListener('click',verTd)
        }
    }
 
    //funcion para que aparezcan las imagenes
    function aparecerImagenes(foto){
        foto.style.width = '100%';
        foto.style.marginLeft = '0%';
        foto.style.height = '98%';     
    }

    //function para ocultar las imagenes
    function ocultarImagenes(foto){
        foto.style.width = '0%';
        foto.style.marginLeft = '40%';
        foto.style.height = '0%'; 
    }

    //funcion para contar los movimientos
    function contadorMovimiento(){
        movimiento++;
        $('#parrafoDos').html(`MOVIMIENTOS ${movimiento}`);
    }

    //funcion para comprobar si has ganado dependiendo del tablero selecionado
    function comprobarVictoria(){   
        if(valorSelect == '2x3'){
            if(contadorVictoria == 3){
                alert('Has Ganado');
                victoria();
            }
        }else if(valorSelect == '3x4'){
            if(contadorVictoria == 6){
                alert('Has Ganado');
                victoria();
            }
        }else if(valorSelect == '5x4'){
            if(contadorVictoria == 10){
                alert('Has Ganado');
                victoria();
            }
        }       
    }

    //funcion para hacer la animacion de victoria
    function victoria(){
        $('#tabla').css('animationName','animacion1');
    }
}