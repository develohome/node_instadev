require('dotenv').config();
require('./database/index');
const express = require('express');
const app = express();
const rotas = require('./apps/router/index');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

rotas(app);

const PORT = process.env.PORT;
const horasFull = [new Date().getHours(), (new Date().getMinutes() < 10 ? "0"+new Date().getMinutes():new Date().getMinutes())].join(':')

app.listen(PORT, ()=>{
    console.log(`###### Servidor rodando no link http://localhost:${PORT}, iniciado em (${horasFull}) ######`);
})
