import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { getId } from 'activitypub-core-utilities';

export function EntityPage({ entity, actor: user }: { entity: AP.Entity; actor?: AP.Actor; }) {
  return <>
    <html lang="en">
      <head>
        <title>ActivityPub - Entity</title>
        <link rel="stylesheet" href="/EntityPage.css" />
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
  for (const type of Object.values(AP.ActivityTypes)) {
    if (entity.type === type) {
      return <ActivityEntity headingLevel={headingLevel} activity={entity} user={user} />
    }
  }

  for (const type of Object.values(AP.ActorTypes)) {
    if (entity.type === type) {
      return <ActorEntity headingLevel={headingLevel} actor={entity} user={user} />
    }
  }

  if (entity.type === AP.CollectionTypes.COLLECTION) {
    return <CollectionEntity headingLevel={headingLevel} collection={entity} user={user} />
  }

  if (entity.type === AP.CollectionTypes.ORDERED_COLLECTION) {
    return <OrderedCollectionEntity headingLevel={headingLevel} collection={entity} user={user} />
  }

  if (entity.type === AP.ExtendedObjectTypes.NOTE) {
    return <NoteEntity headingLevel={headingLevel} note={entity} user={user} />
  }

  for (const type of Object.values(AP.ExtendedObjectTypes)) {
    if (entity.type === type) {
      return <ExtendedObjectEntity headingLevel={headingLevel} extendedObject={entity} user={user} />
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