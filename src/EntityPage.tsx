import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { getId, isTypeOf, isType } from 'activitypub-core-utilities';
import { OutboxPage } from './OutboxPage';

export function EntityPage({ entity, actor: user }: { entity: AP.Entity; actor?: AP.Actor; }) {
  return <>
    <html lang="en">
      <head>
        <title>ActivityPub - Entity</title>
        <link rel="stylesheet" href="/EntityPage.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main>
          <Entity headingLevel={1} entity={entity} user={user} />
          <textarea defaultValue={JSON.stringify(entity)}></textarea>
        </main>
      </body>
    </html>
  </>
};

function Entity({ headingLevel, entity, user }: { entity: AP.Entity; user?: AP.Actor; headingLevel: number; }) {
  if (isType(entity, AP.ExtendedObjectTypes.ARTICLE)) {
    return <ArticleEntity article={entity as AP.Article} />;
  }

  if (isType(entity, AP.ExtendedObjectTypes.NOTE)) {
    return <NoteEntity headingLevel={headingLevel} note={entity as AP.Note} user={user} />
  }

  if (isTypeOf(entity, AP.ActivityTypes)) {
    return <ActivityEntity headingLevel={headingLevel} activity={entity as AP.Activity} user={user} />;
  }

  if (isTypeOf(entity, AP.ActorTypes)) {
    return <ActorEntity headingLevel={headingLevel} actor={entity as AP.Actor} user={user} />;
  }

  if (isType(entity, AP.CollectionTypes.COLLECTION)) {
    return <CollectionEntity headingLevel={headingLevel} collection={entity as AP.Collection} user={user} />;
  }

  if (isType(entity, AP.CollectionTypes.ORDERED_COLLECTION)) {
    if (entity.name === 'Outbox') {
      return <OutboxPage headingLevel={headingLevel} collection={entity as AP.OrderedCollection} user={user} />;
    }

    return <OrderedCollectionEntity headingLevel={headingLevel} collection={entity as AP.OrderedCollection} user={user} />;
  }

  if (isTypeOf(entity, AP.ExtendedObjectTypes)) {
    return <ExtendedObjectEntity headingLevel={headingLevel} extendedObject={entity as AP.ExtendedObject} user={user} />;
  }

  return <></>;
}

function ExtendedObjectEntity({ headingLevel, extendedObject, user }: { extendedObject: AP.ExtendedObject; user?: AP.Actor; headingLevel: number;  }) {
  return (
    <div className="card">
      <div role="heading" aria-level={headingLevel}>
        A(n) {extendedObject.type}.
        {extendedObject.type === 'Image' ? <img src={extendedObject.url.toString() ?? ''} /> : null}
      </div>
    </div>
  )
}

function ActorEntity({ headingLevel, actor, user }: { actor: AP.Actor; user?: AP.Actor; headingLevel: number; } ) {
  return (
    <div className="card">
      {actor.icon && 'url' in actor.icon && actor.icon.url ? (
        <img src={actor.icon.url.toString()} />
      ) : null}
      <div role="heading" aria-level={headingLevel}>
        @{actor.preferredUsername}
      </div>
      {actor.summary ? (
        <p>
          {actor.summary}  
        </p>
      ) : null}
    </div>
  );
}

function NoteEntity({ headingLevel, note, user }: { note: AP.Note; user?: AP.Actor; headingLevel: number; }) {
  const rawAttributedTo = note.attributedTo;

  const untypedAttributedTo = rawAttributedTo && !(rawAttributedTo instanceof URL) && !(Array.isArray(rawAttributedTo)) ? rawAttributedTo : null;
  
  let attributedTo = null;

  for (const type of Object.values(AP.ActorTypes)) {
    if (type === untypedAttributedTo.type) {
      attributedTo = untypedAttributedTo;
    }
  }

  return (
    <div className="card">
      <div role="heading" aria-level={headingLevel}>
        A note by
        <a href={getId(attributedTo).toString() ?? '#'}>
          @{attributedTo.preferredUsername}
        </a>
      </div>
    </div>
  );
}

function CollectionEntity({ headingLevel, collection, user }: { collection: AP.Collection, user?: AP.Actor; headingLevel: number; }) {
  if (!('items' in collection) || !Array.isArray(collection.items)) {
    return <></>
  }

  return (
    <ul>
      {collection.items.map(item => {
        if (item instanceof URL) {
          return <></>;
        }

        return <Entity headingLevel={headingLevel + 1} entity={item} user={user} />
      })}
    </ul>
  )
}

function OrderedCollectionEntity({ headingLevel, collection, user }: { collection: AP.OrderedCollection, user?: AP.Actor; headingLevel: number; }) {
  if (!('orderedItems' in collection) || !Array.isArray(collection.orderedItems)) {
    return <></>
  }

  return (
    <ul>
      {collection.orderedItems.map(item => {
        if (item instanceof URL) {
          return <></>;
        }

        return <Entity headingLevel={headingLevel + 1} entity={item} user={user} />
      })}
    </ul>
  )
}

function ActivityEntity({ headingLevel, activity, user }: { activity: AP.Activity; user?: AP.Actor; headingLevel: number; }) {
  const activityActor = activity.actor;

  if (activityActor instanceof URL || !('preferredUsername' in activityActor)) {
    return <></>;
  }

  const rawActivityObject = 'object' in activity ? activity.object : null;
  const activityObject = rawActivityObject && !(rawActivityObject instanceof URL) && !(Array.isArray(rawActivityObject)) ? rawActivityObject : null;

  return (
    <div className="card">
      <div role="heading" aria-level={headingLevel}>
        <a href={getId(activityActor).toString() ?? '#'}>
          @{activityActor.preferredUsername}
        </a>
        {' '}
        performed a(n)
        {' '}
        <a href={getId(activity).toString() ?? '#'}>
          {activity.type} activity
        </a>
        {activityObject ? <>
          {' '}
          on a(n)
          {' '}
          <a href={getId(activityObject).toString() ?? '#'}>
            {activityObject.type}
          </a>
        </> : null}.
      </div>
    </div>
  );
}

function ArticleEntity({ article }: { article: AP.Article }) {
  return <>
    <h1>
      {article.summary}
    </h1>
    <p>{article.published.toString()}</p>
    <p>{article.attributedTo.toString()}</p>
    {article.content}
  </>
}