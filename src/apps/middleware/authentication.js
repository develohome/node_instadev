const {decryptedToken} = require('../../utils/token');
const {decrypt} = require('../../utils/crypt');

const verifyJwt = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:'Não é possível acessar sem token!'});
    }

    try{
        const {userId} = await decryptedToken(authHeader);
        req.userId = parseInt(decrypt(userId));
        return next();
    }catch(error){
        return res.status(401).json({message: 'Erro ao desencriptar'})
    }
}

module.exports = verifyJwt;