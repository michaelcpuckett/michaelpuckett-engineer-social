import React, { ReactElement } from 'react';

export function ActorProfileTemplate({ headingLevel }: { headingLevel: number }) {
  return <>
    <template id="ActorProfile-template">
      <div className="ActorProfile">
        <slot name="profilePic"></slot>
        <div role="heading" aria-level={headingLevel}>
          <slot name="name"></slot>
        </div>
        <slot name="preferredUsername"></slot>
        <slot name="summary"></slot>
        <dl>
          <dt>
            Location
          </dt>
          <dd>
            <slot name="location"></slot>
          </dd>
          <dt>
            Job Title
          </dt>
          <dd>
            <slot name="jobTitle"></slot>
          </dd>
          <dt>
            <a href="/followers">
              Followers
            </a>
          </dt>
          <dd>
            <slot name="followers"></slot>
          </dd>
          <dt>
            <a href="/following">
              Following
            </a>
          </dt>
          <dd>
            <slot name="following"></slot>
          </dd>
        </dl>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .ActorProfile {
            text-align: center;
          }

          [role="heading"][aria-level="1"] {
            text-align: center;
            font-size: 2em;
          }
          
          [role="heading"][aria-level="2"] {
            font-size: 1.75em;
          }
          
          img {
            max-width: 100%;
          }

          ::slotted([slot="profilePic"]) {
            border-radius: 100%;
            max-width: 50%;
          }
            
          dt {
            font-weight: bold;
            grid-column: 1 / 2;
          }

          dd {
            margin: 0;
            grid-column: 2 / 3;
          }

          dl {
            text-align: left;
            display: grid;
            grid-auto-columns: auto auto;
            gap: 10px;
          }
        `}}>
      </style>
    </template>
    <script src="/ActorProfile.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'actor-profile': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};