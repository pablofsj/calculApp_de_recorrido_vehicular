//Da funcionamiento a select materializecss
$(document).ready(function(){
    $('select').formSelect();
  });


//CIUDADES Y DISTANCIA CON API MAPS----------------------------------------------------------------------------------------------------

//definir clase Ciudad
class Ciudad {
    constructor(nombre, latitud, longitud){
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}

//agregar instancias de clase Ciudad
let antofagasta = new Ciudad ('Antofagasta', -23.65236, -70.3954,);
let laserena = new Ciudad ('La Serena',-29.90453, -71.24894);
let valparaiso = new Ciudad ('Valparaíso',-33.036, -71.62963);
let santiago = new Ciudad ('Santiago',-33.45694, -70.64827);
let concepcion = new Ciudad ('Concepción',-36.82699, -73.04977);
let puertomontt = new Ciudad ('Puerto Montt',-41.4693, -72.94237);

// Crear arreglo para ser recorrido y encontrar data latitud y longitud
let ciudades = [];
ciudades.push(antofagasta);
ciudades.push(laserena);
ciudades.push(valparaiso);
ciudades.push(santiago);
ciudades.push(concepcion);
ciudades.push(puertomontt);

let latitudOrigen = 0;
let longitudOrigen = 0;
let latitudDestino = 0;
let longitudDestino = 0;



//Capturar evento select origen y asignar variables latitud y longitud

$( document ).ready(function() {
    $('#origen').on('change', function() {
        let nombre = $('#origen').find(":selected").text();
        for (let ciudad of ciudades) {
            if(ciudad.nombre == nombre){
                latitudOrigen = ciudad.latitud;
                longitudOrigen = ciudad.longitud;
            }
        }
    });
});

//Capturar evento select destino y asignar variables latitud y longitud

$( document ).ready(function() {
    $('#destino').on('change', function() {
        let nombre = $('#destino').find(":selected").text();
        for (let ciudad of ciudades) {
            if(ciudad.nombre == nombre){
                latitudDestino = ciudad.latitud;
                longitudDestino = ciudad.longitud;
            }
        }
    });
});



//--------------------------------------------------------------------------------------------------------------------------------------


//DEFINIR VEHICULO Y CONSUMO (en km)

//definir clase Vehiculo

class Vehiculo {
    constructor(modelo, consumo){
        this.modelo = modelo;
        this.consumo = consumo;
    }
}

// herenciar clase

class Suv extends Vehiculo{
    constructor(modelo,consumo){
        super(modelo,consumo);
    }
}

class CityCar extends Vehiculo{
    constructor(modelo,consumo){
        super(modelo,consumo);
    }
}

class Sedan extends Vehiculo{
    constructor(modelo,consumo){
        super(modelo,consumo);
    }
}

//agregar instancias de clase Vehiculo

let hyundaiAccent = new Sedan ('Hyundai Accent', 16);
let chevroletSail = new Sedan ('Chevrolet Sail', 15.6);
let toyotaRav4 = new Suv ('Toyota Rav4', 13);
let kiaMorning = new CityCar ('Kia Morning', 18.5);


let vehiculos = [];
vehiculos.push(hyundaiAccent);
vehiculos.push(chevroletSail);
vehiculos.push(toyotaRav4);
vehiculos.push(kiaMorning);


let rendimiento = 0;


//Capturar evento select vehiculo y asignar variable rendimiento (km/lt)

$( document ).ready(function() {
    $('#vehiculo').on('change', function(){
        let modelo = $('#vehiculo').find(":selected").text();
        for (let vehiculo of vehiculos){
            if (vehiculo.modelo == modelo){
                rendimiento = vehiculo.consumo;
            }
        }
        validarSelect();
    });
});

let mensajeResultado = "";

//Distancia entre ciudad origen y ciudad destino (LLamar API maps (fetch), consumo de bencina en litros y tiempo de viaje


$('#boton').on('click', function() {
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitudOrigen},${longitudOrigen}&destinations=${latitudDestino},${longitudDestino}&key=AIzaSyAlDSRLGoUqLzoFZQlR7wvyRoNdsufoQls`)
    .then(datos => datos.json())
    //mostrar resultado en textarea
    .then(datos_json => {
        let kmsConString = datos_json.rows[0].elements[0].distance.text;
        let distanciaEnHoras = datos_json.rows[0].elements[0].duration.text;
        let kms = kmsConString.split(" ")[0];
        kms = kms.replace(',',"");
        let consumo = kms/rendimiento;
        consumo = Math.round(consumo);
        mensajeResultado = `La distancia de recorrido entre las ciudades es de <span id="spanresultado">${kmsConString}</span> y su consumo de bencina será de <span id="spanresultado">${consumo} lts</span> para el vehiculo seleccionado, con un tiempo estimado de viaje de <span id="spanresultado">${distanciaEnHoras}</span>`;
        $(".modal .modal-content").append(`<p>${mensajeResultado}</p>`);
    });    
});

$(document).ready(function(){
    $('.modal').modal({
        opacity : 0.6
    });
});

   





