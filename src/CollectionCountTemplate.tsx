import React, { ReactElement } from 'react';

export function CollectionCountTemplate() {
  return <>
    <template id="CollectionCount-template">
      <span className="CollectionCount"><slot></slot></span>
    </template>
    <script src="/CollectionCount.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'collection-count': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};