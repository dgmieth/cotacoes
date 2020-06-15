console.log('javascript no front end')



const cotacoesForm = document.querySelector('form')
const mainMsg = document.querySelector('h3')
const price = document.querySelector('#price')
const priceOpen = document.querySelector('#price_open')
const dayHigh = document.querySelector('#day_high')
const dayLow = document.querySelector('#day_low')

cotacoesForm.addEventListener('submit', (event) =>{
    mainMsg.innerHTML = 'Buscando'
    const ativo = document.querySelector('input')


    event.preventDefault()
    
    
    if(!ativo.value){
        mainMsg.innerHTML = 'Erro'
        console.log('O ativo deve ser informado')
        return
    }
    fetch(`http://localhost:3000/cotacoes?ativo=${ativo.value}`).then((response)=>{
    response.json().then((data) =>{
        
        if(data.error){
            mainMsg.innerHTML = 'Erro'
            price.innerHTML = data.error
            console.log('error')
        } else {
            mainMsg.innerHTML = data.symbol
            price.innerHTML = `Preco: ${data.price}`
            priceOpen.innerHTML = `Preco abertura: ${data.price_open}`
            dayHigh.innerHTML = `Maior alta: ${data.day_high}`
            dayLow.innerHTML = `Maior baixa: ${data.day_low}`
            console.log(data)
        }
    })
})
})