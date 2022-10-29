"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const react_1 = __importDefault(require("react"));
const express_1 = __importDefault(require("express"));
const IndexPage_1 = require("./IndexPage");
const LoginPage_1 = require("./LoginPage");
const DashboardPage_1 = require("./DashboardPage");
const EntityPage_1 = require("./EntityPage");
const server_1 = require("react-dom/server");
const activitypub_core_server_express_1 = require("activitypub-core-server-express");
const mongodb_1 = require("mongodb");
const activitypub_core_db_mongo_1 = require("activitypub-core-db-mongo");
const activitypub_core_auth_firebase_1 = require("activitypub-core-auth-firebase");
const activitypub_core_storage_ftp_1 = require("activitypub-core-storage-ftp");
const activitypub_core_delivery_1 = require("activitypub-core-delivery");
const activitypub_core_plugin_foaf_1 = require("activitypub-core-plugin-foaf");
(async () => {
    const envServiceAccount = process.env.AP_SERVICE_ACCOUNT;
    if (!envServiceAccount) {
        throw new Error('Bad Service Account.');
    }
    const firebaseServiceAccount = JSON.parse(decodeURIComponent(envServiceAccount));
    const mongoClient = new mongodb_1.MongoClient(process.env.AP_MONGO_CLIENT_URL ?? 'mongodb://localhost:27017', {
        minPoolSize: 10,
    });
    await mongoClient.connect();
    const mongoDb = mongoClient.db('puckett-contact');
    const app = (0, express_1.default)();
    app.use(express_1.default.static('static/'));
    const firebaseAuthAdapter = new activitypub_core_auth_firebase_1.FirebaseAuthAdapter(firebaseServiceAccount, 'pickpuck-com');
    const mongoDbAdapter = new activitypub_core_db_mongo_1.MongoDbAdapter(mongoDb);
    const defaultDeliveryAdapter = new activitypub_core_delivery_1.DeliveryAdapter({
        adapters: {
            db: mongoDbAdapter,
        },
    });
    const ftpStorageAdapter = new activitypub_core_storage_ftp_1.FtpStorageAdapter(JSON.parse(decodeURIComponent(process.env.AP_FTP_CONFIG)), '/uploads');
    const foafPlugin = (0, activitypub_core_plugin_foaf_1.FoafPlugin)();
    const renderLoginPage = async () => {
        return `
      <!doctype html>
      ${(0, server_1.renderToString)(react_1.default.createElement(LoginPage_1.LoginPage, null))}`;
    };
    const renderHomePage = async ({ actor }) => {
        return `
      <!doctype html>
      ${(0, server_1.renderToString)(react_1.default.createElement(DashboardPage_1.DashboardPage, { actor: actor }))}
    `;
    };
    const renderEntityPage = async ({ entity, actor }) => {
        return `
      <!doctype html>
      ${(0, server_1.renderToString)(react_1.default.createElement(EntityPage_1.EntityPage, { entity: entity, actor: actor }))}
    `;
    };
    app.use((0, activitypub_core_server_express_1.activityPub)({
        pages: {
            login: renderLoginPage,
            home: renderHomePage,
            entity: renderEntityPage,
        },
        adapters: {
            auth: firebaseAuthAdapter,
            db: mongoDbAdapter,
            delivery: defaultDeliveryAdapter,
            storage: ftpStorageAdapter,
        },
        plugins: [
            foafPlugin,
        ]
    }));
    app.get('/', (req, res) => {
        const indexPage = `
      <!doctype html>
      ${(0, server_1.renderToString)(react_1.default.createElement(IndexPage_1.IndexPage, null))}
    `;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(indexPage);
        res.end();
    });
    app.listen(process.env.PORT ?? 3000, () => {
        console.log('Running...');
    });
})();
//# sourceMappingURL=index.js.map