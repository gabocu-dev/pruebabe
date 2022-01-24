const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const app = express();
const router = express.Router();

app.use(bodyParser.json());

// Parametros conexión DB
const connection_db = mysql.createConnection({
    host: '85.10.205.173',
    user: 'adminusers',
    password: 'clave123',
    database: 'manageusers'
});


connection_db.connect(error => {
    if (error) throw error;
    console.warn('Conexión Establecida');
});

app.listen(PORT, () => console.log(`Servicio iniciado en el puerto ${PORT}`));

//Endpoints

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM usuario';
  
    connection_db.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay registros');
        }
    });
});

app.get('/findusers/:txt', (req, res) => {
    const { txt } = req.params;
    const sql = `SELECT * FROM usuario WHERE nombre LIKE '%${txt}%'`;
  
    connection_db.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay registros que coincidan con ese nombre');
        }
    });
});

app.post('/addusers', (req, res) => {
    const sql = 'INSERT INTO usuario SET ?';
  
    const usuario = {
        id_rol: req.body.id_rol,
        nombre: req.body.nombre,
        activo: req.body.activo
    };
  
    connection.query(sql, usuario, error => {
        if (error) throw error;
        res.send('Usuario Creado');
    });
});