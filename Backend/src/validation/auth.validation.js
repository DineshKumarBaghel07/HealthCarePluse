import{body,validationResult} from 'express-validator';


const validateAuth = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        next();
}
}
const authValidation =[
    body('username')
    .isString()
    .withMessage('Username must be a string'),
    body('email')
    .isEmail()
    .withMessage('Invalid email address'),,
    body('password')
    .isLength({min:6,max:8})
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least one uppercase letter'),
    body('phone')
    .isLength({min:10,max:10})
    .withMessage('Phone number must be 10 digits long')
    .matches(/^[0-9]+$/)
    .withMessage('Phone number must contain only digits'),
    validateAuth
]


export default authValidation;