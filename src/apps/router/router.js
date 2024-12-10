const {Router} = require('express');
const {upload} = require('../../configs/multer')
const router = new Router();
const UserController = require('../controllers/UserController');
const schemaValidator = require('../middleware/schemaValidator')
const userSchema = require('../../schema/create.user.schema.json')
const AuthenticationController = require('../controllers/AuthenticationController')
const AuthSchema = require('../../schema/auth.schema.json')
const UpdateSchema = require('../../schema/update.schema.json');
const FileController = require('../controllers/FileController');
const AuthenticationMiddleware = require('../middleware/authentication')

router.get('/users', UserController.getUser);

router.post('/users', schemaValidator(userSchema), UserController.create);

router.post('/auth' , schemaValidator(AuthSchema),  AuthenticationController.authenticate, )

router.post('/upload', upload.single('image'), FileController.upload);

router.use(AuthenticationMiddleware);

router.get('/health', (req, res)=>{
    return res.send({messege:'Conectado com sucesso !'})
})
router.put('/user',  UserController.update);
router.delete('/user',  UserController.delete);
router.get('/user-profile', UserController.userProfile);



module.exports = router;
//schemaValidator(UpdateSchema),