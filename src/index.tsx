import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import React from 'react';
import express from 'express';
import { IndexPage } from './IndexPage';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { EntityPage } from './EntityPage';
import { renderToString } from 'react-dom/server';
import { activityPub } from 'activitypub-core-server-express';
import { MongoClient } from 'mongodb';
import { MongoDbAdapter } from 'activitypub-core-db-mongo';
import { FirebaseAuthAdapter } from 'activitypub-core-auth-firebase';
import { FtpStorageAdapter } from 'activitypub-core-storage-ftp';
import { DeliveryAdapter } from 'activitypub-core-delivery';
import { FoafPlugin } from 'activitypub-core-plugin-foaf';
import { ServiceAccount } from 'firebase-admin';
import { ServerResponse, IncomingMessage } from 'http';

(async () => {
  const envServiceAccount = process.env.AP_SERVICE_ACCOUNT;

  if (!envServiceAccount) {
    throw new Error('Bad Service Account.');
  }

  const firebaseServiceAccount: ServiceAccount = JSON.parse(decodeURIComponent(envServiceAccount));

  const mongoClient = new MongoClient(process.env.AP_MONGO_CLIENT_URL ?? 'mongodb://localhost:27017', {
    minPoolSize: 10,
  });
  await mongoClient.connect();
  const mongoDb = mongoClient.db('puckett-contact');

  const app = express();
  app.use(express.static('static/'));

  const firebaseAuthAdapter =
    new FirebaseAuthAdapter(
      firebaseServiceAccount,
      'pickpuck-com'
    );

  const mongoDbAdapter =
    new MongoDbAdapter(mongoDb);

  const defaultDeliveryAdapter =
    new DeliveryAdapter({
      adapters: {
        db: mongoDbAdapter,
      },
    });

  const ftpStorageAdapter =
    new FtpStorageAdapter(
      JSON.parse(decodeURIComponent(process.env.AP_FTP_CONFIG)),
      '/uploads'
    );
  
  const foafPlugin = FoafPlugin(); // TODO: Make callable with `new`.
  
  const renderLoginPage = async () => {
    return `
      <!doctype html>
      ${renderToString(
        <LoginPage />
      )}`;
  };

  const renderHomePage = async ({ actor }) => {
    return `
      <!doctype html>
      ${renderToString(
        <DashboardPage actor={actor} />
      )}
    `;
  };

  const renderEntityPage = async ({ entity, actor }) => {
    return `
      <!doctype html>
      ${renderToString(
        <EntityPage
          entity={entity}
          actor={actor}
        />
      )}
    `;
  };

  app.use(
    activityPub({
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
        {
          generateActorId: () => () => {
            return `https://profile.michaelpuckett.engineer`;
          },
        },
      ]
    }),
  );

  app.get('/', (req: IncomingMessage, res: ServerResponse) => {
    const indexPage = `
      <!doctype html>
      ${renderToString(
        <IndexPage />
      )}
    `;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.write(indexPage);
    res.end();
  });

  app.listen(process.env.PORT ?? 3000, () => {
    console.log('Running...');
  });
})();