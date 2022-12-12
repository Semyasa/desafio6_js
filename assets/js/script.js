const btn = document.getElementById("buscar")
let pesos = document.getElementById("pesos")
let resultado = document.getElementById("resultado")
let convertirA = document.getElementById("divisa")
let grafico


btn.addEventListener("click", () => {

renderGrafica()

})


async function getMonedas() {

    const url = "https://mindicador.cl/api/" + convertirA.value

    try{

    const res = await fetch(url)
    const divisa = await res.json()
    const valorDivisa = divisa.serie
    const monedas = valorDivisa.filter(Elemento => valorDivisa.indexOf(Elemento) < 10)
    
    return monedas;
    
    } catch (e){

        alert(e)
    }

    }

async function convertir(monedas){

    const valorDelDia = monedas[0].valor
    valorConvertido = pesos.value / valorDelDia
    conDosDecimales = valorConvertido.toFixed(2)

    if(convertirA.value == "uf"){
    resultado.innerHTML = `<span><strong>Resultado: ${conDosDecimales} UF</strong></span>`;
    }
    if(convertirA.value == "dolar"){
        resultado.innerHTML = `<span><strong>Resultado: ${conDosDecimales} USD</strong></span>`;
    }
    if(convertirA.value == "euro"){
        resultado.innerHTML = `<span><strong>Resultado: ${conDosDecimales} EUR</strong></span>`;
    }

}


function prepararConfiguracionParaLaGrafica(monedas) {

  
    
    const tipoDeGrafica = "line"
    const titulo = "Historial Ultimos 10 Dias de: " + convertirA.value
    const colorDeLinea = "red"

    const valoresFecha = monedas.map((fecha) => {return fecha.fecha})
    const valoresMonedas = monedas.map((moneda) => {return moneda.valor})
    


    const config = {
    type: tipoDeGrafica,
    data: {
    labels: valoresFecha,
    datasets: [
        {
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valoresMonedas
            }
            ]
            }
            };

            return config;
        }


async function renderGrafica() {

   if(grafico){
    grafico.destroy();
   }

    let monedas = await getMonedas()
    convertir(monedas)
    const config = prepararConfiguracionParaLaGrafica(monedas)
    const chartDOM = document.getElementById("myChart")
    grafico = new Chart(chartDOM, config)

    }

