const { json } = require("express");
const clientController = require("../model/model");

const userController = {

    //route root
    getRoot: async (req, res) => {
        res.status(200).json({ msg: "The API is running!!!" })
    },
    //Controller para listar todos os usuários do banco
    listAllUsers: async (req, res) => {
        try {
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de usuários" })
        }
    },

    //Controller para listar usuários por ID
    listByID: async(req,res)=>{
        try{
            const sql = await clientController.getByEmail(req.params.email);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este ID"})
            }
        }
        catch(error){
            return error
        }   
    },

    //Criar um novo usuário
    createNewUser: async(req,res)=>{
        const {id,nome,sobrenome,email,senha} = req.body;

        console.log(req.body);

        try{
            const sql = await clientController.getByEmail(email);

            console.log(sql);

            if(sql.length > 0){
                res.status(401).json({msg: "O email já esta cadastrado no Banco de Dados"})
            }
            else{
                await clientController.registerUser(id,nome,sobrenome,email,senha);
                res.status(201).json({msg:"Usuário cadastrado com sucesso"});
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },

    login: async(req,res) => {
        let {email,senha} = req.body;

        try{
            const sql = await clientController.validateLogin(email,senha);

            if(sql.length > 0) {
                res.status(200).json({msg: "Email e senha validados com sucesso!!"})
            }

            else{
                res.status(401).json({msg:"Email ou senha incorretos"});
            }
        }
        catch(error) {
            if(error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    }
};

module.exports = userController;