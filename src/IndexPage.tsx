import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';

export function IndexPage({ }) {
  return <>
    <html lang="en">
      <head>
        <title>ActivityPub - Welcome</title>
        <link rel="stylesheet" href="/IndexPage.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main>
          <p>This server can establish identity on the Fediverse.</p>
        </main>
      </body>
    </html>
  </>
};