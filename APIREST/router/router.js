const { Router } = require('express');
const router = Router();

//exportando controladores

const { getUser, createUser, getUserById, deleteUser, updateUser,registroUser,consultaInicio,inicioSesion, createInicio,gatos,gatosById,crearGato} = require('../controllers/router.controller.js')

//routers
////duenio
router.post('/registro',registroUser);
router.get('/user', getUser);
router.get('/user/:id',getUserById);
router.post('/user',createUser);
router.delete('/user/:id',deleteUser);
router.put('/user/:id',updateUser);
//---------------------------------
//Inicio de Sesion
router.get('/login',consultaInicio);
router.get('/login/:email',inicioSesion);
router.post('/login',createInicio);
//-----------------------------------------
//oh no---------------------------
router.get('/gato',gatos);
router.get('/gato/:id',gatosById);
router.post('/gato',crearGato);


module.exports = router;
