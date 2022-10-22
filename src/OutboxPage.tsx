import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { getId } from 'activitypub-core-utilities';

export function OutboxPage({ headingLevel, collection, user }: { collection: AP.OrderedCollection, user?: AP.Actor; headingLevel: number; }) {
  if (!('orderedItems' in collection) || !Array.isArray(collection.orderedItems)) {
    return <></>;
  }

  return (
    <main>
      <span role="heading" aria-level={headingLevel}>
        Michael Puckett's Blog
      </span>
      {collection.orderedItems.map(item => {
        return (
          <blog-post data-id={getId(item).toString()}>
            Loading...
          </blog-post>
        );
      })}
      <template id="BlogPost-template">
        <div className="BlogPost">
          <slot name="content"></slot>
        </div>
      </template>
      <script src="/OutboxPage.js" type="module"></script>
    </main>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'blog-post': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};
