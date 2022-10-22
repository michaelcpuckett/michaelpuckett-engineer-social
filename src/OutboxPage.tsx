import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { getId } from 'activitypub-core-utilities';
import { BlogPostTemplate } from './BlogPostTemplate';

export function OutboxPage({ headingLevel, collection, user }: { collection: AP.OrderedCollection, user?: AP.Actor; headingLevel: number; }) {
  if (!('orderedItems' in collection) || !Array.isArray(collection.orderedItems)) {
    return <></>;
  }

  return (
    <main>
      <span role="heading" aria-level={headingLevel}>
        Michael Puckett's Blog
      </span>
      <div className="feed">
        {collection.orderedItems.map(item => {
          return (
            <blog-post data-id={getId(item).toString()}></blog-post>
          );
        })}
      </div>
      <BlogPostTemplate headingLevel={headingLevel + 1} />
    </main>
  );
}
