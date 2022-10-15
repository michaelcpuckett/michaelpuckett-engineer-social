import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import React from 'react';
import express from 'express';
import { activityPub } from 'activitypub-core-express-middleware';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { EntityPage } from 'activitypub-core-jsx-components';
import { renderToString } from 'react-dom/server';
import { MongoDatabaseService } from 'activitypub-core-mongodb';
import { FirebaseAuthentication } from 'activitypub-core-firebase-authentication';
import { DeliveryService } from 'activitypub-core-delivery';
import { ServiceAccount } from 'firebase-admin';

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
    dbName: 'michaelpuckett-engineer',
  });
  const deliveryService = new DeliveryService(databaseService);

  app.use(
    activityPub(
      {
        renderIndex: async () => {
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
        ${renderToString(<DashboardPage actor={actor} />)}
      `;
        },
      },
      {
        authenticationService,
        databaseService,
        deliveryService,
      },
    ),
  );

  app.listen(process.env.PORT ?? 3000, () => {
    console.log('Running...');
  });
})();