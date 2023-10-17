import { Router } from "express";
import pool from "../database.js";
import { validateEmail, validateNickname } from "../validations/usuarios.validation.js";

const usuarioRouter = Router();

/**
 * ENDPOINT PARA LISTAR TODOS LOS USUARIOS
 */
usuarioRouter.get('/userList', async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM usuario");
        res.status(200).json({result: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * ENDPOINT PARA LOGUEARSE
 */
usuarioRouter.get('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const [usuario] = await pool.query("SELECT * FROM usuario WHERE email = ?", [email]);
        const usuarioObtenido = usuario[0];
        if (usuarioObtenido) {
            if (usuarioObtenido.password === password) {
                res.status(200).json({message: usuarioObtenido});
            } else {
                res.status(401).json({message: "Error: Credenciales incorrectas"});
            }
        } else {
            res.status(404).json({message: "Usuario no registrado"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * ENDPOINT PARA REGISTRAR UN NUEVO USUARIO
 */
usuarioRouter.post('/register', async (req, res) => {
    try {
        const {email, password, role, nickname} = req.body;
        if (await validateEmail(email) === true && await validateNickname(nickname) === true) {
            const newUsuario = {
                email, password, role, nickname
            }
            await pool.query("INSERT INTO usuario SET ?", [newUsuario]);
            res.status(200).json({message: "Usuario Registrado correctamente"});
        } else {
            if (await validateEmail(email) === false) return res.status(401).json({message: "Ya existe un usuario registrado con ése correo"});
            if (await validateNickname(nickname) === false) return res.status(401).json({message: "Nickname no disponible"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * ENDPOINT PARA OBTENER UN USUARIO EN BASE A SU NICKNAME
 */
usuarioRouter.get('/userNickname', async(req, res) => {
    try {
        const nickname = req.body.nickname;
        const [user] = await pool.query("SELECT * FROM usuario WHERE nickname = ?", [nickname]);
        const usuarioObtenido = user[0];
        res.status(200).json({message: usuarioObtenido});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * ENDPOINT PARA EDITAR DATOS DE UN USUARIO
 */
usuarioRouter.patch('/userEdit', async (req, res) => {
    try {
        const id = req.body.id;
        const {email, password, role, nickname} = req.body;
        if (await validateEmail(email) === true && await validateNickname(nickname) === true) {
            const userEdit = {email, password, role, nickname};
            await pool.query("UPDATE usuario SET ? WHERE id = ?", [userEdit, id]);
            res.status(200).json({message: "Datos del usuario actualizados con éxito"});
        } else {
            if (await validateEmail(email) === false) return res.status(401).json({message: "Ya existe un usuario registrado con ése correo"});
            if (await validateNickname(nickname) === false) return res.status(401).json({message: "Nickname no disponible"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * ENDPOINT PARA ELIMINAR UN USUARIO
 */
usuarioRouter.delete('/userDelete', async(req, res) => {
    console.log("entro");
    try {
        const id = req.body.id;
        await pool.query("DELETE FROM usuario WHERE id = ?", [id]);
        res.status(200).json({message: "Usuario eliminado con éxito"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default usuarioRouter;