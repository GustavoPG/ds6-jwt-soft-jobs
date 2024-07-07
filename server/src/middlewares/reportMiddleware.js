// reportMiddleware.js

const reportTransasction = (req, res, next) => {
    console.log(`Consulta recibida: ${req.method} ${req.url}`);
    next();
  };
  
  export { reportTransasction };