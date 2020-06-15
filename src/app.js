const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('cotacoes', {
        title: 'Bem Vindo ao Sistema de Cotações',
        author: 'Diego Rafael Mieth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Diego Rafael Mieth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda'
    })
})

app.get('/cotacoes', (req, res) => {
   console.log(req.query.ativo)
   const erro = {
       message: 'O ativo deve ser informado'
   }
   if(!req.query.ativo){
       return res.status(400).json(erro)
   }
   const symbol = req.query.ativo.toUpperCase()
   cotacoes(symbol, (error, data) => {
       if(error){
           return res.status(500).json(error)
       }
       console.log(data)
       res.status(200).json(data)
   })

})

app.get('/help/*', (req, res)=>{
    // res.send('404 do help ')
    res.render('404', {
        title: 'ERROR 404',
        errorMessage : 'ERROR 404: nao existe pagina depois de /help'}
        )
})
app.get('*', (req, res)=>{
    res.render('404', {
        title: 'ERROR 404',
        errorMessage: 'ERROR 404: pagina nao encontrada'
    })
})


app.listen(3000, ()=>{
    console.log('server is up at door 3000')
})