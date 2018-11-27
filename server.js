const express = require('express')
const app = express()
const hdbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const path = require('path')
const images = require('./routes/images')


app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hdbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render('home')
})
app.use('/images',images)

mongoose.connect(config.MONGODB_URL,{ useNewUrlParser: true },(err, res)=>{
	if(err)throw err
	console.log('Conexion a la base de datos establecida')
	app.listen(config.PORT,()=>{
	console.log(`Servidor corriendo en el puerto ${config.PORT}`)
	})
	})
