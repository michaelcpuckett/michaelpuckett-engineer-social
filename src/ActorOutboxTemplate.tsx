import React, { ReactElement } from 'react';

export function ActorOutboxTemplate({ headingLevel }: { headingLevel: number }) {
  return <>
    <template id="ActorOutbox-template">
      <div className="ActorOutbox">
        <span role="heading" aria-level={headingLevel}>
          Outbox
        </span>
        <ul>
          <slot></slot>
        </ul>
      </div>
      <style>
        {`
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </template>
    <script src="/ActorOutbox.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'actor-outbox': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};