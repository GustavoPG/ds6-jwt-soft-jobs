// validateMiddleware.js

const validparameters = ( req, res, next) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({error: "Faltan email o password"});
    }
    next();
}

const validateParametersUser = (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
        return res.status(400).json({ error: "el email, password, rol y lenguage son obligatorios" });
    }
    next();
}

export { validparameters, validateParametersUser };

