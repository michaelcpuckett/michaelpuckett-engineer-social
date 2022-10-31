import React, { ReactElement } from 'react';

export function CollectionItemsTemplate() {
  return <>
    <template id="CollectionItems-template">
      <span role="heading" aria-level={2}>
        <slot name="name"></slot>
      </span>
      <ul>
        <slot></slot>
      </ul>
      <style dangerouslySetInnerHTML={{
        __html: `
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }
        `
      }}></style>
    </template>
    <script src="/CollectionItem.js" type="module"></script>
    <script src="/CollectionItems.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'collection-items': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};