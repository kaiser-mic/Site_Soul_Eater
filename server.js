const express = require('express');
const knex = require('knex');
const errors = require('http-errors');
const bcrypt = require('bcrypt');

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

app.post('/register', async (req, res, ) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'usuario e senha sao necessarios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await conn('usuarios').insert({ username, password: hashedPassword });
        res.status(201).json({ message: 'usuario registrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro interno no servidor' });
    }
}
);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'usuario e senha sao necessarios' });
    }

    try {
        const user = await conn('usuarios').where({ username }).first();
        if (!user) {
            return res.status(401).json({ error: 'Usuario ou senha invalidos' });
        }

        const senhaCorreta = await bcrypt.compare(password, user.password);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Usuario ou senha invalidos' });
        }

        res.json({ message: 'Login bem sucedido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
}
);