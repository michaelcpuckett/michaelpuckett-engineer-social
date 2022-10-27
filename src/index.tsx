import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import React from 'react';
import express from 'express';
import { activityPub } from 'activitypub-core-express-middleware';
import { IndexPage } from './IndexPage';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { EntityPage } from './EntityPage';
import { renderToString } from 'react-dom/server';
import { MongoDatabaseService } from 'activitypub-core-mongodb';
import { FirebaseAuthentication } from 'activitypub-core-firebase-authentication';
import { FtpStorage } from 'activitypub-core-ftp-storage';
import { DeliveryService } from 'activitypub-core-delivery';
import { ServiceAccount } from 'firebase-admin';
import { ServerResponse, IncomingMessage } from 'http';
import { foafPlugin } from 'activitypub-core-plugin-foaf';

const envServiceAccount = process.env.AP_SERVICE_ACCOUNT;

if (!envServiceAccount) {
  throw new Error('Bad Service Account.');
}

const serviceAccount: ServiceAccount = JSON.parse(decodeURIComponent(envServiceAccount));

(async () => {
  const app = express();
  app.use(express.static('static/'));

  const authenticationService = new FirebaseAuthentication(serviceAccount, 'pickpuck-com');
  const databaseService = await new MongoDatabaseService().connect({
    mongoClientUrl: process.env.AP_MONGO_CLIENT_URL ?? 'mongodb://localhost:27017',
    dbName: 'puckett-contact',
  });
  const deliveryService = new DeliveryService(databaseService);
  const storageService = new FtpStorage(JSON.parse(decodeURIComponent(process.env.AP_FTP_CONFIG)), '/uploads');

  app.use(
    activityPub(
      {
        renderLogin: async () => {
          return `
            <!doctype html>
            ${renderToString(<LoginPage />)}`;
        },
        renderEntity: async ({ entity, actor }) => {
          return `
            <!doctype html>
            ${renderToString(<EntityPage entity={entity} actor={actor} />)}
         `;
        },
        renderHome: async ({ actor }) => {
          return `
            <!doctype html>
            ${renderToString(<DashboardPage actor={actor} />
          )}
        `;
        },
      },
      {
        authenticationService,
        databaseService,
        deliveryService,
        storageService,
        plugins: [
          foafPlugin({
            newPerson: JSON.parse(JSON.stringify({
              "type": ["Actor", "foaf:Person"], // TODO
              "foaf:name": "Michael Puckett",
              "foaf:basedNear": "Louisville, KY, USA",
              "foaf:birthday": "06-17",
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
      },
    ),
  );

  app.get('/', (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.write(`
      <!doctype html>
      ${renderToString(<IndexPage />)}
    `);
    res.end();
  });

  app.listen(process.env.PORT ?? 3000, () => {
    console.log('Running...');
  });
})();