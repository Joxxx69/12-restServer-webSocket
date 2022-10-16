const { Router } = require('express');
const { check } = require('express-validator');
const controller = require('../controllers/auth.controller');
const {validarCampos} = require('../middlewares/validar-campos.middleware');
const {errorHandler } = require('../middlewares/error-handler.middleware');

const router = Router();


// Aqui ocupo middlewares a nivel de Router
 
router.post('/post/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], controller.Login, [
    errorHandler,
]);

router.post('/post/google', [
    check('id_token', 'id_token es necesario').notEmpty(),
    validarCampos
], controller.googleSignIn, [
    errorHandler
]);


// esta ruta aun esta de verle es para un posible registro de un usuario 
/*router.post('/post/signUp', [
    check('correo', 'El correo es obligario').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    async (req, res, next) => {
        if (req.body.password) {
            await check('passwordConfirmation').equals(req.body.password).withMessage('passwords do not match').run()
        }
    },

    check('valida')
], controller.Login, [
    errorHandler
]);
*/


module.exports = router;







