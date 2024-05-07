const connection= require("../config/db");

const userModel = {
    getAllUsers: async () =>{
        const [result] = await connection.query("SELECT * FROM usuarios")
        .catch(erro => console.log(erro));
        return result
    },

    getByEmail: async (email) =>{
        const [result] = await connection.query("SELECT * FROM usuarios WHERE email =?", [email])
        .catch(erro => console.log(erro));
        return result
    },
    registerUser: async (id,nome,sobrenome,email,senha) =>{
        const [result] = await connection.query("INSERT INTO usuarios values(?,?,?,?,?)",[id,nome,sobrenome,email,senha])
        .catch(erro => console.log(erro));
        return result;
    },

    validateLogin: async(email,senha)=> {
        const [result] = await connection.query("SELECT * FROM usuarios WHERE email=? AND senha =?",[email,senha])
        .catch(erro => console.log(erro));
        return result   
    }, 
};

module.exports = userModel;