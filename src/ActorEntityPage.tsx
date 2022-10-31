import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { ActorOutboxTemplate } from './ActorOutboxTemplate';
import { OutboxItemTemplate } from './OutboxItemTemplate';
import { getId, isTypeOf, isType } from 'activitypub-core-utilities';
import { ActorProfileTemplate } from './ActorProfileTemplate';
import { CollectionCountTemplate } from './CollectionCountTemplate';
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
          <main className="container-item container-item--profile">
            <Profile actor={actor} />
          </main>
          <section aria-label="Outbox" className="container-item container-item--outbox">
            <Outbox actor={actor} />
          </section>
          <aside className="container-item container-item--complementary">
            <h2>
              My Wall
            </h2>
            <collection-items data-id={actor.replies.toString()}></collection-items>
            <CollectionItemsTemplate />
          </aside>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(actor) }}></script>
      </body>
    </html>
  );
}

function Profile({ actor }: { actor: AP.Actor }) {
  return <>
    <actor-profile data-attributed-to={JSON.stringify(actor.id)}></actor-profile>
    <ActorProfileTemplate headingLevel={1} />
    <CollectionCountTemplate />
  </>
}

function Outbox({ actor }: { actor: AP.Actor }) {
  return (
    <div className="outbox">
      <actor-outbox data-actor-id={actor.id.toString()}></actor-outbox>
      <ActorOutboxTemplate headingLevel={2} />
      <OutboxItemTemplate />
    </div>
  );
}