const express = require('express');
const knex = require('knex');
const errors = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require ('path');
const cors = require('cors');


require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('O valor da chave secreta é:', process.env.JWT_SECRET);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8001;
const hostname = 'localhost';

const conn = knex({
  client: 'mysql2',
  connection: {
    host: hostname,
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

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];
    

    if (token == null) return res.status(401).json({ error: 'nenhum token foneciod' });

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) return res.status(403).json({ error: 'Token invalido ou expirado' });
        req.usuario = usuario;
        next();
    })
};


app.post('/registrar', async (req, res, ) => {
    const { usuario, email, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ error: 'usuario e senha sao necessarios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        await conn('usuarios').insert({ usuario, email, senha: hashedPassword });
        res.status(201).json({ message: 'usuario registrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro interno no servidor' });
    }
}
);

app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ error: 'usuario e senha sao necessarios' });
    }

    try {
        const usuarioDoBanco = await conn('usuarios').where({ usuario: usuario }).first();
        if (!usuarioDoBanco) {
            return res.status(401).json({ error: 'Usuario ou senha invalidos' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioDoBanco.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Usuario ou senha invalidos' });
        }
        const payload ={
            id: usuarioDoBanco.id,
            usuario: usuarioDoBanco.usuario
        }
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        res.json({ message: 'Login bem-sucedido', token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
    
}
);


app.post('/criar-personagem', verificarToken, async (req, res) => {
    console.log("Dados recebidos do formulário:", req.body);

    const id_usuario = req.usuario.id;

    const {nome, aparencia, personalidade, historia, weapon_form, forca, destreza, constituicao, inteligencia, sabedoria, carisma, atletismo, furtividade, vigor,
            medicina, sobrevivencia, performance, intimidacao, prestidigitacao, conhecimento, percepcao, persuasao, acrobacia, resistencia, investigacao, intuicao, enganacao,
            habilidade, nivel_resonancia, sanidade, vida, tipo} = req.body;
        if (!id_usuario){
            return res.status(400).json({ error: 'Voce precisa estar logado' });
        }
        try {
        await conn('fichas').insert({ id_usuario, nome, aparencia, personalidade, historia, weapon_form, forca, destreza, constituicao, inteligencia, sabedoria, carisma, atletismo, furtividade, vigor,
            medicina, sobrevivencia, performance, intimidacao, prestidigitacao, conhecimento, percepcao, persuasao, acrobacia, resistencia, investigacao, intuicao, enganacao,
            habilidade, nivel_resonancia, sanidade, vida, tipo });
        res.status(201).json({ message: 'ficha registrada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro interno no servidor' });
    }
});

app.get('/fichas', verificarToken, async (req, res) => {    

    try{
        const id_usuario = req.usuario.id

        const fichasDoUsuario = await conn('fichas')
        .where({ id_usuario: id_usuario })
        .select('*')


        res.status(200).json(fichasDoUsuario)
    }
    catch (error){
        console.error(error)
        res.status(500).json({ error: 'erro interno no servidor' });
    }


})