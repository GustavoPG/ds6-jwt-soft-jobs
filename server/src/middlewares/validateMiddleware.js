// validateMiddleware.js

const validparameters = ( req, res, next) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({error: "Faltan email o password"});
    }
  next();
};

const validateParametersUser = (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
      return res.status(400).json({ error: "El email, password, rol y lenguage son obligatorios" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "El email debe tener un formato válido" });
    }
    if (password.length < 4) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 4 caracteres" });
    }
    next();
  };

export { validparameters, validateParametersUser };