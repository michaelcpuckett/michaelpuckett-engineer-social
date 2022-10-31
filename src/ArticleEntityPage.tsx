import React from 'react';
import { AP } from 'activitypub-core-types';
import { ActorProfileTemplate } from './ActorProfileTemplate';
import { CollectionCountTemplate } from './CollectionCountTemplate';

export function ArticleEntityPage({ article, user }: { article: AP.Article; user?: AP.Actor; } ) {
  return (
    <html lang="en">
      <head>
        <title dangerouslySetInnerHTML={{__html: `${article.summary} | Blog Post`}}></title>
        <link rel="stylesheet" href="/ArticleEntityPage.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="container">
          <section aria-label="Profile" className="container-item container-item--profile">
            <Profile article={article} />
          </section>
          <main className="container-item container-item--article">
            <Article article={article} />
          </main>
          <aside className="container-item container-item--complementary"></aside>
        </div>
      </body>
    </html>
  );
}

function Profile({ article }: { article: AP.Article }) {
  return <>
    <actor-profile data-attributed-to={JSON.stringify(article.attributedTo)}></actor-profile>
    <ActorProfileTemplate headingLevel={2} />
    <CollectionCountTemplate />
  </>
}

function Article({ article }: { article: AP.Article }) {
  return <div>
    <div role="heading" aria-level={1}>
      {article.summary}
    </div>
    <div>
      {article.content}
    </div>
  </div>
}