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
          <p>Hi! My name is <a href="/actor/michael">Michael Puckett</a> (<a href="https://michaelpuckett.engineer">resume</a>).</p>
          <p>This server is for my presence on the Fediverse.</p>
          <ul>
            <li>
              <a href="/actor/michael/outbox">
                All Fediverse Posts
              </a>
            </li>
          </ul>
        </main>
      </body>
    </html>
  </>
};