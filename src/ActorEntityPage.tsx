import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { ActorOutboxTemplate } from './ActorOutboxTemplate';
import { OutboxItemTemplate } from './OutboxItemTemplate';
import { getId, isTypeOf, isType } from 'activitypub-core-utilities';
import { CollectionCountTemplate } from './CollectionCountTemplate';

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
          <section aria-label="Outbox" className="container-item container-item--outbox">
            <Outbox actor={actor} />
          </section>
          <aside className="container-item container-item--complementary">
            <p>Register to reply, like, or share.</p>
          </aside>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(actor) }}></script>
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
    <dl>
      {actor['http://xmlns.com/foaf/0.1/based_near'] ? <>
        <dt>
          Location
        </dt>
        <dd>
          {actor['http://xmlns.com/foaf/0.1/based_near']}
        </dd>
      </> : null}

      
      {actor['https://schema.org/jobTitle'] ? <>
        <dt>
          Job Title
        </dt>
        <dd>
          {actor['https://schema.org/jobTitle']}
        </dd>
      </> : null}

      <dt>
        Followers
      </dt>
      <dd>
        <a href="/followers">
          <collection-count data-id={actor.followers}></collection-count>
        </a>
      </dd>

      <dt>
        Following
      </dt>
      <dd>
        <a href="/following">
          <collection-count data-id={actor.following}></collection-count>
        </a>
      </dd>
    </dl>
    <CollectionCountTemplate />
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