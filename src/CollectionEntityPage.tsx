import React from 'react';
import { AP } from 'activitypub-core-types';
import { ActorProfileTemplate } from './ActorProfileTemplate';
import { CollectionCountTemplate } from './CollectionCountTemplate';
import { CollectionItemTemplate } from './CollectionItemTemplate';
import { CollectionItemsTemplate } from './CollectionItemsTemplate';

export function CollectionEntityPage({ collection, user }: { collection: AP.OrderedCollection|AP.Collection; user?: AP.Actor; } ) {
  return (
    <html lang="en">
      <head>
        <title
          dangerouslySetInnerHTML={{
            __html: `${collection.name} | Listing`,
          }}>
        </title>
        <link
          rel="stylesheet"
          href="/ActorEntityPage.css"
        />
        <meta
          name="viewport" 
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body>
        <div className="container">
          <section
            className="
              container-item
              container-item--profile
            ">
            {collection.attributedTo ? (
              <actor-profile
                data-attributed-to={JSON.stringify(collection.attributedTo)}
              ></actor-profile>
            ) : null}
          </section>
          <main
            aria-label={collection.name}
            className="
              container-item
              container-item--collection
            ">
            <collection-items
              data-id={collection.id?.toString()}
            ></collection-items>
          </main>
          <aside
            aria-label="Replies"
            className="
              container-item
              container-item--complementary
            ">
            <collection-items
              data-id={collection.replies?.toString()}
            ></collection-items>
          </aside>
        </div>
        <ActorProfileTemplate headingLevel={2} />
        <CollectionCountTemplate />
        <CollectionItemTemplate />
        <CollectionItemsTemplate />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collection),
          }}>
        </script>
      </body>
    </html>
  );
}