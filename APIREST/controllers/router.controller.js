//conexiones post

const { request } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: '5433',
    user: 'postgres',
    password: '123',
    database:'web'
});

//Funciones de registro
const registroUser = async (req,res)=>{
    const {email,password} = req.body;

    res.send('registro');
};


//-------------Funciones de duenios--------------------

const getUser = async (req,res)=>{
   const response = await pool.query('SELECT * FROM duenio');
   res.status(200).json(response.rows);
   /*tengo que revisar si tengo que dejar creado el archivo aqui
   console.log(response.rows);
   res.send('users')
    */
};

const createUser = async (req,res) => {
    
    const {nombre,edad,direccion,genero,email} = req.body;
    const response =  await pool.query('insert into duenio(nombre,edad,direccion,genero,email) values ($1,$2,$3,$4,$5)', [nombre,edad,direccion,genero,email]);
    
    console.log(req.body);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {nombre,edad,direccion,genero,email}
        }
    });
};

const getUserById = async (req,res)=>{

    const id = req.params.id;
    const response = await pool.query('SELECT * FROM duenio WHERE duenio_id =$1',[id]);
    res.json(response.rows[0]);

    //res.send('User ID ' + req.params.id);
};

const deleteUser = async (req,res) => {

    const id = req.params.id;
    const response = await pool.query('DELETE FROM duenio WHERE duenio_id=$1',[id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);
};


const updateUser = async (req,res) =>{

    const id = req.params.id;
    const {nombre,edad,direccion,genero,email} = req.body;

    const response = await pool.query('UPDATE duenio SET nombre = $1, edad = $2,direccion =$3,genero = $4, email = $5 WHERE duenio_id = $6',[nombre,edad,direccion,genero,email,id]);

    console.log(response);
    res.json('User Update Successfully');

};

//-------------------------------------------------------

//-------------Inicio de Sesion-------------------------



const consultaInicio = async(req,res)=>{
    //yo creo que uso exclusivo para insomnia
    const response = await pool.query('SELECT * FROM usuario');
    res.status(200).json(response.rows);
};

const inicioSesion = async(req,res)=>{
    const email = req.params.email;
    const response = await pool.query('SELECT * FROM usuario WHERE email_user =$1',[email]);
    res.json(response.rows[0]);

};

const createInicio = async(req,res)=>{
    const {email,pass} = req.body;
    const response =  await pool.query('insert into usuario(email,pass) values ($1,$2)', [email,pass]);
    
    console.log(req.body);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {email,pass}}
    });
};

//-------------------------------------------------------


//-------------------------------------------------------
//contacto
const gatos = async(req,res)=>{
    const response = await pool.query('SELECT * FROM gatos');
    res.status(200).json(response.rows);
};

const gatosById = async(req,res)=>{
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM gatos WHERE id_gatos =$1',[id]);
    res.json(response.rows[0]);
};

const crearGato = async(req,res)=>{
    const {nombre,peso,pelaje,genero,diag} = req.body;
    const response =  await pool.query('insert into gatos(nombre,peso,pelaje,genero,diag_id) values ($1,$2,$3,$4,$5)', [nombre,peso,pelaje,genero,diag]);
    
    console.log(req.body);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {nombre,peso,pelaje,genero,diag}
        }
    });
}

//exporta la funcion
module.exports = {
    registroUser,
    getUser,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    consultaInicio,
    inicioSesion,
    createInicio,
    gatos,
    gatosById,
    crearGato
}