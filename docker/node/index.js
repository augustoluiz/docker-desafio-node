const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sobrenomes = ['Silva', 'Souza', 'Santos', 'Pereira', 'Oliveira'];

app.get('/', (req, res) => {
    inserirRegistroNaBase();
    enviarDados(res);    
})

function inserirRegistroNaBase(){
    connection.query(`INSERT INTO people (name) VALUES ('Augusto ${gerarSobrenomeRandom()}')`);
}

function gerarSobrenomeRandom(){
    return sobrenomes[gerarIndexSobrenome()];
}

function gerarIndexSobrenome(){
    return Math.round(Math.random() * ((sobrenomes.length -1) - 0) + 0);
}

function enviarDados(res){
    recuperarDados(res);
}

function recuperarDados(res){
    connection.query(`SELECT name FROM people`, (err, result) => {
        if(err) throw err;

        let listaNomes = "";
        result.forEach(nome => {
            listaNomes += `<li>${nome["name"]}</li>`;
        });

        res.send(`<h1>Full Cycle Rocks!</h1><br>${listaNomes}`)
    });
}

app.listen(port, () => {
console.log(`Rodando na porta ${port}`);
})

const createTable = `CREATE TABLE IF NOT EXISTS people (id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`;
connection.query(createTable);