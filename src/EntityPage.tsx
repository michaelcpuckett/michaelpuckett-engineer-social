import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';

export function EntityPage({ entity, actor }: { entity: AP.Entity; actor?: AP.Actor; }) {
  return <>
    <html lang="en">
      <head>
        <title>ActivityPub - Entity</title>
      </head>
      <body>
        <main>
          There's an entity here!
        </main>
      </body>
    </html>
  </>
};