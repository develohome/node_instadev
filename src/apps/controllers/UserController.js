const UserModel = require('../models/Users')
const bcryptjs = require('bcryptjs')

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

    async update(req, res){
        const {name, avatar, bio, gender, old_password, new_password, confirm_new_password} = req.body;

        
        const user = await UserModel.findOne({
            where:{
                id: req.userId
            }
        });
        //console.log(user)
         if(!user){
            return res.status(400).json({message:'Usuário não encontrado'});
         }

         let encryptedPassword = '';

         if(old_password){
            if(!await user.checkPassword(old_password)){
                return res.status(400).json({error:"À senha antiga não confere"})
            }

            if(!new_password || !confirm_new_password){
                return res.status(401).json({error: 'We need a new_password and confirm_new_password attributes!'})
            }

            if(new_password !== confirm_new_password){
                return res.status(401).json({error:"As senhas não conferem"})
            }

            encryptedPassword = await bcryptjs.hash(new_password, 8)
         }

         await UserModel.update({
            name: name || user.name,
            avatar: avatar || user.avatar,
            bio: bio || user.bio,
            gender: gender || user.gender,
            password_hash: encryptedPassword || user.password_hash
         },
         {
            where:{
                id:user.id
            }
         }
        );
        return res.status(200).json({message:'Atualizado com sucesso'});
     }
}

module.exports = new UserController();