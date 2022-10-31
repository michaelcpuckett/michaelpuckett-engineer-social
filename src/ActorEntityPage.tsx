import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { ActorOutboxTemplate } from './ActorOutboxTemplate';
import { OutboxItemTemplate } from './OutboxItemTemplate';
import { getId, isTypeOf, isType } from 'activitypub-core-utilities';
import { ActorProfileTemplate } from './ActorProfileTemplate';
import { CollectionCountTemplate } from './CollectionCountTemplate';
import { CollectionItemTemplate } from './CollectionItemTemplate';
import { CollectionItemsTemplate } from './CollectionItemsTemplate';

export function ActorEntityPage({ actor, user }: { actor: AP.Actor; user?: AP.Actor; } ) {
  return (
    <html lang="en">
      <head>
        <title dangerouslySetInnerHTML={{__html: `${actor.name} | Profile`}}></title>
        <link rel="stylesheet" href="/ActorEntityPage.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="container">
          <main
            className="
              container-item
              container-item--profile
            ">
            <actor-profile
              data-attributed-to={JSON.stringify(actor.id)}>
            </actor-profile>
          </main>
          <section
            aria-label="Outbox"
            className="
              container-item
              container-item--outbox
            ">
            <collection-items
              data-id={actor.outbox.toString()}>
            </collection-items>
          </section>
          <aside
            aria-label="Wall"
            className="
              container-item
              container-item--complementary
            ">
            <collection-items
              data-id={actor.replies.toString()}>
            </collection-items>
          </aside>
        </div>
        <ActorProfileTemplate headingLevel={1} />
        <CollectionCountTemplate />
        <CollectionItemTemplate />
        <CollectionItemsTemplate />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(actor) }}>
        </script>
      </body>
    </html>
  );
}