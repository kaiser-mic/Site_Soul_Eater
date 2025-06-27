const express = require('express');
const knex = require('knex');
const errors = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8001;
const hostname = 'localhost';

const conn = knex({
  client: 'mysql2',
  connection: {
    host: 'hostname',
    user: 'root',
    password: '',
    database: 'site_rpg'
    }
});
app.get("/" , (req, res) => {
    res.json( { resposta : "Seja bem-vindo(a) ao nosso site"} )
} )


app.listen( PORT , () =>{
    console.log( `site executando em: http://localhost:${PORT}` )
} )