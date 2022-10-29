import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { ActorOutboxTemplate } from './ActorOutboxTemplate';
import { OutboxItemTemplate } from './OutboxItemTemplate';
import { getId, isTypeOf, isType } from 'activitypub-core-utilities';

export function ActorEntityPage({ actor, user }: { actor: AP.Actor; user?: AP.Actor; } ) {
  return (
    <html lang="en">
      <head>
        <title>{actor.name} | Profile</title>
        <link rel="stylesheet" href="/ActorEntityPage.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="container">
          <main className="container-item container-item--profile">
            <Profile actor={actor} />
          </main>
          <section aria-label="Outbox" className="container-item outbox">
            <Outbox actor={actor} />
          </section>
          <aside className="container-item complementary"></aside>
        </div>
      </body>
    </html>
  );
}

function ProfilePic({ actor }: { actor: AP.Actor }) {
  return <>{actor.icon && 'url' in actor.icon && actor.icon.url ? (
    <img src={actor.icon.url.toString()} />
  ) : null}</>
}

function Profile({ actor }: { actor: AP.Actor }) {
  return <div className="profile">
    <ProfilePic actor={actor} />
    <div role="heading" aria-level={1}>
      {actor.name}
    </div>
    <p>
      @{actor.preferredUsername}
    </p>
    {actor.summary ? (
      <p>
        {actor.summary}  
      </p>
    ) : null}
  </div>;
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