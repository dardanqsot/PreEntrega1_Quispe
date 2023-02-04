////Simulador de cálculo de cuotas y tasa de interés segun condiciones del solicitante y tarifario configurado
// previamente (se configura como máximo un monto de 1500$, un plazo maximo de 24 meses y un rango de
// sueldo entre 1 a 1500$ de parte del solicitante)
//Condiciones para determinar tasa de ínteres
/*
* en caso no encontrar la condición, no se le ofrecerá tasa sugerida
Monto       | Plazo   | Sueldo    | Tasa sugerida| Combinacion
1 - 500     | 1 - 12  | 1-1000    |   18%        |  M1P1S1
1 - 500     | 1 - 12  | 1001-1500 |   8%         |  M1P1S2
1 - 500     | 13 - 24 | 1-1000    |   12%        |  M1P2S1
1 - 500     | 13 - 24 | 1001-1500 |   6%         |  M1P2S2
501 - 1000  | 1 - 12 | 1-1000     |   20%        |  M2P1S1
501 - 1000  | 1 - 12 | 1001-1500  |   16%        |  M2P1S2
501 - 1000  | 13 - 24 | 1-1000    |   10%        |  M2P2S1
501 - 1000  | 13 - 24 | 1001-1500 |   7%         |  M2P2S2
*
*/
class Monto {
  constructor(minimo, maximo) {
    this.minimo = minimo;
    this.maximo = maximo;
  }
}

class Plazo {
  constructor(minimo, maximo) {
    this.minimo = minimo;
    this.maximo = maximo;
  }
}

class Sueldo {
  constructor(minimo, maximo) {
    this.minimo = minimo;
    this.maximo = maximo;
  }
}

class Tarifario {
  constructor(monto, plazo, sueldo, tasa) {
    this.monto = monto;
    this.plazo = plazo;
    this.sueldo = sueldo;
    this.tasa = tasa;
  }
}

const opcionMonto1 = new Monto(1, 500);
const opcionMonto2 = new Monto(501, 1000);

const opcionPlazo1 = new Plazo(1, 12);
const opcionPlazo2 = new Plazo(13, 24);

const opcionSueldo1 = new Sueldo(1, 1000);
const opcionSueldo2 = new Sueldo(1001, 1500);

const tarifario1 = new Tarifario(opcionMonto1, opcionPlazo1, opcionSueldo1, 18);
const tarifario2 = new Tarifario(opcionMonto1, opcionPlazo1, opcionSueldo2, 8);
const tarifario3 = new Tarifario(opcionMonto1, opcionPlazo2, opcionSueldo1, 12);
const tarifario4 = new Tarifario(opcionMonto1, opcionPlazo2, opcionSueldo2, 6);
const tarifario5 = new Tarifario(opcionMonto2, opcionPlazo1, opcionSueldo1, 20);
const tarifario6 = new Tarifario(opcionMonto2, opcionPlazo1, opcionSueldo2, 16);
const tarifario7 = new Tarifario(opcionMonto2, opcionPlazo2, opcionSueldo1, 10);
const tarifario8 = new Tarifario(opcionMonto2, opcionPlazo2, opcionSueldo2, 7);

alert(
  "Bienvenido al simulador de tasas y cuotas de pago! \n todos los montos a ingresar se" +
    " consideran de la misma moneda($). )"
);
let montoSolicitado = parseInt(prompt("Ingrese el monto a solicitar: "));
let plazoSolicitado = parseInt(
  prompt("Ingrese el plazo a solicitar en meses: ")
);
let sueldoActual = parseInt(prompt("Ingrese su sueldo actual: "));

let montoSeleccionado = -1;
let combinacion = "";
if (  montoSolicitado >= opcionMonto1.minimo &&  montoSolicitado <= opcionMonto1.maximo) {
  combinacion += "M1";
} else if (  montoSolicitado >= opcionMonto2.minimo &&  montoSolicitado <= opcionMonto2.maximo) {
  combinacion += "M2";
} else {
  combinacion += "-1";
}

if (  plazoSolicitado >= opcionPlazo1.minimo &&  plazoSolicitado <= opcionPlazo1.maximo) {
  combinacion += "P1";
} else if (  plazoSolicitado >= opcionPlazo2.minimo &&  plazoSolicitado <= opcionPlazo2.maximo) {
  combinacion += "P2";
} else {
  combinacion += "-2";
}

if (  sueldoActual >= opcionSueldo1.minimo &&  sueldoActual <= opcionSueldo1.maximo) {
  combinacion += "S1";
} else if (  sueldoActual >= opcionSueldo2.minimo &&  sueldoActual <= opcionSueldo2.maximo) {
  combinacion += "S2";
} else {
  combinacion += "-3";
}

let continuarSimulacion = true;
let tarifarioDado = new Tarifario();
alert("Combinación de Opciones: " + combinacion);

switch (combinacion) {
  case "M1P1S1":
    alert("Tasa Sugerida: " + tarifario1.tasa+"%");
    tarifarioDado = tarifario1;
    break;
  case "M1P1S2":
    alert("Tasa Sugerida: " + tarifario2.tasa+"%");
    tarifarioDado = tarifario2;
    break;
  case "M1P2S1":
    alert("Tasa Sugerida: " + tarifario3.tasa+"%");
    tarifarioDado = tarifario3;
    break;
  case "M1P2S2":
    alert("Tasa Sugerida: " + tarifario4.tasa+"%");
    tarifarioDado = tarifario4;
    break;
  case "M2P1S1":
    alert("Tasa Sugerida: " + tarifario5.tasa+"%");
    tarifarioDado = tarifario5;
    break;
  case "M2P1S2":
    alert("Tasa Sugerida: " + tarifario6.tasa+"%");
    tarifarioDado = tarifario6;
    break;
  case "M2P2S1":
    alert("Tasa Sugerida: " + tarifario7.tasa+"%");
    tarifarioDado = tarifario7;
    break;
  case "M2P2S2":
    alert("Tasa Sugerida: " + tarifario8.tasa+"%");
    tarifarioDado = tarifario8;
    break;
  default:
    alert("No se encontró un tarifario para las condiciones ingresadas, Por favor ingrese otras.");
    continuarSimulacion = false;
    break;
}

if(continuarSimulacion){
   
   console.log('La tasa dada fue en base a las siguientes condiciones: ');
   console.log(tarifarioDado.monto);
   console.log(tarifarioDado.plazo);
   console.log(tarifarioDado.sueldo);

   simularCredito(montoSolicitado, tarifarioDado.tasa, plazoSolicitado/12);
   simulateCreditoLargoPlazo(montoSolicitado, tarifarioDado.tasa, plazoSolicitado/12);
   //let mensajePagoMensual = `El pago Mensual será de ${pagoMensual} $`;
   //alert(mensajePagoMensual);
}

// Función para calcular el pago mensual
function calcularCuotaMensual(monto, tasa, anios) {
  let tasaMensual = tasa / 12 / 100;
  let cuotas = anios * 12;
  return ((monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, - cuotas))
  );
}


// Función para simular un crédito
function simularCredito(monto, tasa, anios) {
  let pagoMensual = calcularCuotaMensual(monto, tasa, anios);
  let totalAPagar = pagoMensual * anios * 12;
  let totalInteres = totalAPagar - monto;

  alert(`Pago mensual: ${pagoMensual.toFixed(2)}`);
  alert(`Pago total: ${totalAPagar.toFixed(2)}`);
  alert(`Intereses totales: ${totalInteres.toFixed(2)}`);
}

// Función para simular un crédito a lo largo 
function simulateCreditoLargoPlazo(monto, tasa, anios) {

  let mensaje = "";
  for (let i = 1; i <= anios; i++) {
    let actualPagoMensual = calcularCuotaMensual( monto, tasa, i );
    let actualPagoTotal = actualPagoMensual * i * 12;
    let actualPagoInteres = actualPagoTotal - monto;

    mensaje += i + "    |     " + actualPagoMensual.toFixed(2) + "   |       " + 
    actualPagoTotal.toFixed(2) + "   |       " + actualPagoInteres.toFixed(2) + "\n";
  }
  alert("Año, Pago mensual, Pago total, Intereses totales \n" + mensaje);

}

