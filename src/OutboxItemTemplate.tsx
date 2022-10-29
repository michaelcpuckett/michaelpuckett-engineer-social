import React, { ReactElement } from 'react';

export function OutboxItemTemplate() {
  return <>
    <template id="OutboxItem-template">
      <li className="OutboxItem">
        <slot></slot>
      </li>
      <style>
        {`
          li {
            margin: 0;
            padding: 0;
            border: 1px solid magenta;
            padding: 10px;
          }
        `}
      </style>
    </template>
    <script src="/OutboxItem.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'outbox-item': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};