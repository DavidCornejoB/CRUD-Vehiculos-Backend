import pool from "../database.js";

export async function validateEmail(email) {
    const [usuario] = await pool.query("SELECT * FROM usuario WHERE email = ?", [email]);
    if (usuario.length === 0) {
        return true;
    } 
    return false;
}

export async function validateRepeatPassword(password, repeatPassword){
    if (password === repeatPassword) {
        return true;
    }
    return false;
}

export async function validateNickname(nickname) {
    const [usuario] = await pool.query("SELECT * FROM usuario WHERE nickname = ?", [nickname]);
    if (usuario.length === 0) {
        return true;
    } 
    return false;
}