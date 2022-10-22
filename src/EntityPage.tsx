import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { getId, getTypedEntity } from 'activitypub-core-utilities';
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
  const typedEntity = getTypedEntity(entity as { [key: string]: unknown });
  const entityType: string|string[] = typedEntity.type;

  if (entityType === AP.ExtendedObjectTypes.ARTICLE) {
    return <ArticleEntity article={typedEntity as AP.Article} />;
  }

  for (const type of Object.values(AP.ActivityTypes)) {
    if (entityType === type || (
      Array.isArray(entityType) &&
      entityType.includes(type)
    )) {
      return <ActivityEntity headingLevel={headingLevel} activity={typedEntity as AP.Activity} user={user} />
    }
  }

  for (const type of Object.values(AP.ActorTypes)) {
    if (entityType === type || (
      Array.isArray(entityType) &&
      entityType.includes(type)
    )) {
      return <ActorEntity headingLevel={headingLevel} actor={typedEntity as AP.Actor} user={user} />
    }
  }

  if (entityType === AP.CollectionTypes.COLLECTION || (Array.isArray(entityType) && entityType.includes(AP.CollectionTypes.COLLECTION))) {
    return <CollectionEntity headingLevel={headingLevel} collection={typedEntity as AP.Collection} user={user} />
  }

  if (entityType === AP.CollectionTypes.ORDERED_COLLECTION || (Array.isArray(entityType) && entityType.includes(AP.CollectionTypes.ORDERED_COLLECTION))) {
    if (typedEntity.name === 'Outbox') {
      return <OutboxPage headingLevel={headingLevel} collection={typedEntity as AP.OrderedCollection} user={user} />
    }
    return <OrderedCollectionEntity headingLevel={headingLevel} collection={typedEntity as AP.OrderedCollection} user={user} />
  }

  if (entityType === AP.ExtendedObjectTypes.NOTE || (Array.isArray(entityType) && entityType.includes(AP.ExtendedObjectTypes.NOTE))) {
    return <NoteEntity headingLevel={headingLevel} note={typedEntity as AP.Note} user={user} />
  }

  for (const type of Object.values(AP.ExtendedObjectTypes)) {
    if (entityType === type || (Array.isArray(entityType) && entityType.includes(type))) {
      return <ExtendedObjectEntity headingLevel={headingLevel} extendedObject={typedEntity as AP.ExtendedObject} user={user} />
    }
  }

  return <></>;
}

function ExtendedObjectEntity({ headingLevel, extendedObject, user }: { extendedObject: AP.ExtendedObject; user?: AP.Actor; headingLevel: number;  }) {
  return (
    <div className="card">
      <div role="heading" aria-level={headingLevel}>
        An {extendedObject.type}.
      </div>
    </div>
  )
}

function ActorEntity({ headingLevel, actor, user }: { actor: AP.Actor; user?: AP.Actor; headingLevel: number; } ) {
  return (
    <div className="card">
      <div role="heading" aria-level={headingLevel}>
        @{actor.preferredUsername}
      </div>
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
    <p>{article.published}</p>
    <p>{article.attributedTo}</p>
    {article.content}
  </>
}