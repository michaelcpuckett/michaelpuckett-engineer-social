import React, { ReactElement } from 'react';

export function CollectionItemTemplate() {
  return <>
    <template id="CollectionItem-template">
      <li className="CollectionItem">
        <slot name="activityType"></slot>
        <slot></slot>
      </li>
      <style>
        {`
          li {
            margin: 0;
            padding: 0;
            padding: 10px;
          }
        `}
      </style>
    </template>
    <script src="/CollectionItem.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'collection-item': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};