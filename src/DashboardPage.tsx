import React, { ReactElement } from 'react';
import { AP } from 'activitypub-core-types';
import { getId } from 'activitypub-core-utilities';
import { BlogPostTemplate } from './BlogPostTemplate';
import { ImageSelectorTemplate } from './ImageSelectorTemplate';

export function DashboardPage({ actor }: { actor: AP.Actor }) {
  return <>
    <html lang="en">
      <head>
        <title>ActivityPub Dashboard</title>
        <link rel="stylesheet" href="DashboardPage.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main>
          <h1>Welcome, {actor.name}.</h1>
          <details>
            <summary>
              Send arbitrary JSON
            </summary>
            <div>
              <form id="ArbitraryJsonForm">
                <textarea name="body" defaultValue={JSON.stringify({
                  '@context': 'https://www.w3.org/ns/activitystreams#'
                })}></textarea>
                <button type="submit">
                  Submit
                </button>
              </form>
              <script type="module" src="/ArbitraryJsonForm.js"></script>
            </div>
          </details>
          <details>
            <summary>
              Edit Profile
            </summary>

            <form noValidate action={getId(actor.outbox).toString()} id="EditProfileForm">
              <input type="hidden" name="actorId" value={getId(actor).toString()} />
              <input type="hidden" name="objectId" value={getId(actor).toString()} />
              <label>
                <span>Bio</span>
                <textarea name="summary" defaultValue={actor.summary ?? ''}></textarea>
              </label>
              <label>
                <span>First Name</span>
                <input type="text" name="firstName" defaultValue={actor['schema:givenName'] ?? ''} />
              </label>
              <label>
                <span>Last Name</span>
                <input type="text" name="lastName" defaultValue={actor['schema:familyName'] ?? ''} />
              </label>
              <label>
                <span>Email</span>
                <input type="text" name="schema:email" defaultValue={actor['schema:email'] ?? ''} />
              </label>
              <label>
                <span>City</span>
                <input type="text" name="city" />
              </label>
              <label>
                <span>State</span>
                <input type="text" name="state" />
              </label>
              <label>
                <span>Country</span>
                <input type="text" name="country" />
              </label>
              <label>
                <span>Job Title</span>
                <input type="text" name="schema:jobTitle" defaultValue={actor['schema:jobTitle'] ?? ''} />
              </label>
              <label>
                <span>Homepage</span>
                <input type="text" name="foaf:homepage" defaultValue={actor['foaf:homepage'] ?? ''}/>
              </label>
              <label>
                <span>LinkedIn</span>
                <input type="text" name="linkedin" />
              </label>
              <label>
                <span>GitHub</span>
                <input type="text" name="github" />
              </label>
              <label>
                <span>Also Known As</span>
                <input type="text" name="alsoKnownAs" />
              </label>
              <button type="submit">
                Update
              </button>
            </form>
            <script src="/EditProfileForm.js" type="module"></script>
          </details>
          <Nav actor={actor} />
          <div className="container">
            <div>
              <FollowForm actor={actor} />
              <CreateNoteForm actor={actor} />
              <CreateArticleForm actor={actor} />
              <UploadMediaForm actor={actor} />
              <OutboxFeed actor={actor} />
            </div>
            <InboxFeed actor={actor} />
          </div>
          <BlogPostTemplate headingLevel={2} />
          <ImageSelectorTemplate />
        </main>
      </body>
    </html>
  </>;
}

function FollowForm({ actor }: { actor: AP.Actor }) {
  return (
    <div className="card">
      <h2>
        Follow a User
      </h2>
      <form noValidate id="FollowForm" action={getId(actor.outbox).toString()}>
        <input type="hidden" name="actor" value={getId(actor).toString()} />
        <label>
          <span>
            User's @id
          </span>
          <input type="text" name="object" />
        </label>
        <button type="submit">
          Follow
        </button>
      </form>
      <script type="module" src="/FollowForm.js"></script>
    </div>
  );
}

function BoxLink({ collection, children }: { collection?: URL | AP.EitherCollection, children: string | ReactElement }) {
  if (!collection) {
    return <></>
  };

  return collection instanceof URL ? (
    <li>
      <a href={collection.toString()}>
        {children}
      </a>
    </li>
  ) : collection.id instanceof URL ? (
    <li>
      <a href={collection.id.toString()}>
        {children}
      </a>
    </li>
  ) : <>Test</>;
}

function Nav({ actor }: { actor: AP.Actor }) {
  return (
    <nav>
      <ul>
        {actor.url instanceof URL ? (
          <li>
            <a href={getId(actor).toString() ?? '#'}>
              You
            </a>
          </li>
        ) : null}
        <BoxLink collection={actor.inbox}>
          Inbox
        </BoxLink>
        <BoxLink collection={actor.outbox}>
          Outbox
        </BoxLink>
        <BoxLink collection={actor.following}>
          Following
        </BoxLink>
        <BoxLink collection={actor.followers}>
          Followers
        </BoxLink>
        <BoxLink collection={actor.liked}>
          Liked
        </BoxLink>
        {actor.streams ? actor.streams.map(stream => (typeof stream !== 'string' && 'id' in stream && stream.id && 'name' in stream && stream.name && !Array.isArray(stream.name)) ?
          <BoxLink collection={stream.id}>
            {stream.name}
          </BoxLink> : <></>) : <></>}
      </ul>
    </nav>
  );
}

function CreateNoteForm({ actor }: { actor: AP.Actor }) {
  return (
    <div className="feed">
      <h2>Post a Status</h2>
      <form
        id="CreateNoteForm"
        action={getId(actor.outbox).toString()}
        noValidate>
        <input type="hidden" name="actorId" value={getId(actor).toString()} />
        <label>
          <span>
            What's on your mind?
          </span>
          <textarea name="content"></textarea>
        </label>
        <label>
          <span>
            Image
          </span>
          <image-selector data-user-id={getId(actor).toString()}>
            <input type="hidden" name="attachment" slot="input" />
          </image-selector>
        </label>
        <button type="submit">
          Post Status
        </button>
      </form>
      <script type="module" src="/CreateNoteForm.js"></script>
    </div>
  );
}

function CreateArticleForm({ actor }: { actor: AP.Actor }) {
  return (
    <div className="feed">
      <h2>Post a Blog</h2>
      <form
        id="CreateArticleForm"
        action={getId(actor.outbox).toString()}
        noValidate>
        <input type="hidden" name="actorId" value={getId(actor).toString()} />
        <label>
          <span>Summary</span>
          <textarea name="summary"></textarea>
        </label>
        <label>
          <span>Content</span>
          <textarea name="content"></textarea>
        </label>
        <button type="submit">
          Post Blog
        </button>
      </form>
      <script type="module" src="/CreateArticleForm.js"></script>
    </div>
  );
}

function InboxFeed({ actor }: { actor: AP.Actor }) {
  return (
    <div className="feed">
      <h2>Feed</h2>
      <ul>
        {'orderedItems' in actor.inbox && Array.isArray(actor.inbox.orderedItems) ? actor.inbox.orderedItems.map(item => {
          return <blog-post data-id={getId(item).toString()} data-user-id={getId(actor).toString()}></blog-post>
        }) : null}
      </ul>
    </div>
  );
}

function OutboxFeed({ actor }: { actor: AP.Actor }) {
  return (
    <div className="feed">
      <h2>Recent Posts</h2>
      <ul>
        {'orderedItems' in actor.outbox && Array.isArray(actor.outbox.orderedItems) ? actor.outbox.orderedItems.map(item => {
          return <blog-post data-id={getId(item).toString()} data-user-id={getId(actor).toString()}></blog-post>
        }) : null}
      </ul>
    </div>
  );
}

function LikeButton({ object, actor }: { object: AP.Entity; actor: AP.Actor; }) {
  return <>
    <form action={getId(actor.outbox).toString()} className="LikeButtonForm">
      <input type="hidden" name="actorId" value={getId(actor.id).toString()} />
      <input type="hidden" name="objectId" value={getId(object.id).toString()} />
      {'to' in object ? (
        <input type="hidden" name="objectTo" value={JSON.stringify(object.to)} />
      ) : null}
      {'cc' in object ? (
        <input type="hidden" name="objectCC" value={JSON.stringify(object.cc)} />
      ) : null}
      {'audience' in object ? (
        <input type="hidden" name="objectAudience" value={JSON.stringify(object.audience)} />
      ) : null}
      <button type="submit">
        Like
      </button>
    </form>
    <script type="module" src="/LikeButtonForm.js"></script>
  </>
}

function AnnounceButton({ object, actor }: { object: AP.Entity; actor: AP.Actor; }) {
  return <>
    <form action={getId(actor.outbox).toString()} className="AnnounceButtonForm">
      <input type="hidden" name="actorId" value={getId(actor.id).toString()} />
      <input type="hidden" name="objectId" value={getId(object.id).toString()} />
      {'to' in object ? (
        <input type="hidden" name="objectTo" value={JSON.stringify(object.to)} />
      ) : null}
      {'cc' in object ? (
        <input type="hidden" name="objectCC" value={JSON.stringify(object.cc)} />
      ) : null}
      {'audience' in object ? (
        <input type="hidden" name="objectAudience" value={JSON.stringify(object.audience)} />
      ) : null}
      <button type="submit">
        Announce
      </button>
    </form>
    <script type="module" src="/AnnounceButtonForm.js"></script>
  </>
}

function ReplyForm({ object, actor }: { object: AP.Entity; actor: AP.Actor; }) {
  return <>
    <details>
      <summary>
        Reply
      </summary>
      <form className="ReplyForm" noValidate action={getId(actor.outbox).toString()}>
        <input type="hidden" name="actorId" value={getId(actor).toString()} />
        <input type="hidden" name="inReplyTo" value={getId(object).toString()} />
        <label>
          <span>Reply</span>
          <textarea name="content"></textarea>
        </label>
        <button type="submit">
          Send Reply
        </button>
      </form>
      <script type="module" src="/ReplyForm.js"></script>
    </details>
  </>
}

function UploadMediaForm({ actor }: { actor: AP.Actor }) {
  return <>
    <form action={actor.endpoints.uploadMedia.toString()} id="UploadMediaForm">
      <input type="file" name="file" />
      <input type="hidden" name="object" value={JSON.stringify({
        "type": "Image",
      })} />
      <button type="submit">
        Upload
      </button>
    </form>
    <script type="module" src="/UploadMediaForm.js"></script>
  </>
}