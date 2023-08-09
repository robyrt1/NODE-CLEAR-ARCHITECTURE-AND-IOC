import "reflect-metadata";
import express  from "express";
import morgan from 'morgan'
import { InversifyExpressServer} from "inversify-express-utils";
import container from "../conf/inversify/inversify.config";
import '../conf/routes/routes'

const app = new InversifyExpressServer(container);

app.setConfig((app) => {
    app.use(express.urlencoded({
      extended: true
    }));
    app.use(express.json());
    app.use(morgan('dev'));
  });


const server = app.build();

server.listen(3000,()=>{
    console.log("[INFO] - Server connection successfully performed, port: 3000.")
})