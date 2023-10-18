import  express from "express";
import cors from "cors";
import morgan from "morgan";
import usuarioRouter from "../src/routes/usuarios.route.js";
import * as dotenv from "dotenv";

// INITIALIZATION
const app = express();
dotenv.config();

// SETTINGS
app.set('port', process.env.PORT || 3000);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// ROUTES
app.use(usuarioRouter);

// RUN SERVER
app.listen(app.get('port'), () => console.log("Server listening on port ", app.get('port')));