import "reflect-metadata";
import express  from "express";
import morgan from 'morgan'
import cors from 'cors';
import { InversifyExpressServer, getRouteInfo} from "inversify-express-utils";
import container from "../conf/inversify/inversify.config";
import '../conf/routes/routes'
import { map } from "lodash";

const app = new InversifyExpressServer(container);

app.setConfig((app) => {
    app.use(express.urlencoded({
      extended: true
    }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(
      cors({
        credentials: true,
        origin: ["http://localhost:4200"],
      })
    );
  });


const server = app.build();
const portServer = Number(process.env.PORT);
const routeInfo = getRouteInfo(container)

map(routeInfo, enpoints => {
  const nameController = enpoints.controller;
  map(enpoints.endpoints, endpoint => {
    console.log(`\x1b[34mLOG [RouterExplorer] - ${nameController} - {${endpoint.route}}\x1b[0m`);
  });
});
const serverRun = server.listen(portServer,()=>{
  const address: any= serverRun.address();
  console.log(`[INFO] - Server connection: http://${address.address}:${address.port}`);
})