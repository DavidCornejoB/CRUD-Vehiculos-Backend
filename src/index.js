import  express from "express";
import morgan from "morgan";
import usuarioRouter from "../src/routes/usuarios.route.js";

// INITIALIZATION
const app = express();

// SETTINGS
app.set('port', process.env.PORT || 3000);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.use(usuarioRouter);

// RUN SERVER
app.listen(app.get('port'), () => console.log("Server listening on port ", app.get('port')));