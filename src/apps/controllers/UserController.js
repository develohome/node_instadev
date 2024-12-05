const UserModel = require('../models/Users')

class UserController{
    async getUser(req, res){
        const users = await UserModel.findAll();
        res.send(users)
    }
    async create(req, res){
        const verifyUser = await UserModel.findOne({
            where:{
                email: req.body.email
            }
        })
        if(verifyUser){
            return res.status(400).json({message: "Usuário existente !"})
        }
        const user = await UserModel.create(req.body);
        res.send(user)
    }
}

module.exports = new UserController();