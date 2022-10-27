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
const activitypub_core_express_middleware_1 = require("activitypub-core-express-middleware");
const IndexPage_1 = require("./IndexPage");
const LoginPage_1 = require("./LoginPage");
const DashboardPage_1 = require("./DashboardPage");
const EntityPage_1 = require("./EntityPage");
const server_1 = require("react-dom/server");
const activitypub_core_mongodb_1 = require("activitypub-core-mongodb");
const activitypub_core_firebase_authentication_1 = require("activitypub-core-firebase-authentication");
const activitypub_core_ftp_storage_1 = require("activitypub-core-ftp-storage");
const activitypub_core_delivery_1 = require("activitypub-core-delivery");
const activitypub_core_plugin_foaf_1 = require("activitypub-core-plugin-foaf");
const envServiceAccount = process.env.AP_SERVICE_ACCOUNT;
if (!envServiceAccount) {
    throw new Error('Bad Service Account.');
}
const serviceAccount = JSON.parse(decodeURIComponent(envServiceAccount));
(async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.static('static/'));
    const authenticationService = new activitypub_core_firebase_authentication_1.FirebaseAuthentication(serviceAccount, 'pickpuck-com');
    const databaseService = await new activitypub_core_mongodb_1.MongoDatabaseService().connect({
        mongoClientUrl: process.env.AP_MONGO_CLIENT_URL ?? 'mongodb://localhost:27017',
        dbName: 'puckett-contact',
    });
    const deliveryService = new activitypub_core_delivery_1.DeliveryService(databaseService);
    const storageService = new activitypub_core_ftp_storage_1.FtpStorage(JSON.parse(decodeURIComponent(process.env.AP_FTP_CONFIG)), '/uploads');
    app.use((0, activitypub_core_express_middleware_1.activityPub)({
        renderLogin: async () => {
            return `
            <!doctype html>
            ${(0, server_1.renderToString)(react_1.default.createElement(LoginPage_1.LoginPage, null))}`;
        },
        renderEntity: async ({ entity, actor }) => {
            return `
            <!doctype html>
            ${(0, server_1.renderToString)(react_1.default.createElement(EntityPage_1.EntityPage, { entity: entity, actor: actor }))}
         `;
        },
        renderHome: async ({ actor }) => {
            return `
            <!doctype html>
            ${(0, server_1.renderToString)(react_1.default.createElement(DashboardPage_1.DashboardPage, { actor: actor }))}
        `;
        },
    }, {
        authenticationService,
        databaseService,
        deliveryService,
        storageService,
        plugins: [
            (0, activitypub_core_plugin_foaf_1.foafPlugin)({
                newPerson: JSON.parse(JSON.stringify({
                    "type": ["Actor", "foaf:Person"],
                    "foaf:name": "Michael Puckett",
                    "foaf:basedNear": "Louisville, KY, USA",
                    "foaf:img": "https://michaelpuckett.engineer/avatar.png",
                    "foaf:logo": "https://michaelpuckett.engineer/favicon.svg",
                    "foaf:mbox": "mailto:michael@puckett.contact",
                    "foaf:homepage": "https://michaelpuckett.engineer",
                    "foaf:weblog": "https://puckett.contact/actor/michael",
                    "foaf:nick": "michaelcpuckett",
                    "foaf:holdsAccount": [{
                            "@type": "foaf:OnlineAccount",
                            "foaf:accountServiceHomepage": "https://github.com",
                            "foaf:accountName": "michaelcpuckett",
                        }, {
                            "@type": "foaf:OnlineAccount",
                            "foaf:accountServiceHomepage": "https://linkedin.com",
                            "foaf:accountName": "michaelcpuckett",
                        }],
                    "foaf:currentProject": "https://github.com/michaelcpuckett/activitypub-core",
                    "foaf:interest": [
                        "https://dbpedia.org/resource/Web_accessibility"
                    ],
                    "foaf:workplaceHomepage": "https://google.com",
                    "foaf:schoolHomepage": "https://wku.edu",
                }))
            }),
        ]
    }));
    app.get('/', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(`
      <!doctype html>
      ${(0, server_1.renderToString)(react_1.default.createElement(IndexPage_1.IndexPage, null))}
    `);
        res.end();
    });
    app.listen(process.env.PORT ?? 3000, () => {
        console.log('Running...');
    });
})();
//# sourceMappingURL=index.js.map