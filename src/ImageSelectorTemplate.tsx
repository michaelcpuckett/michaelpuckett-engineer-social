import React, { ReactElement } from 'react';

export function ImageSelectorTemplate({}) {
  return <>
    <template id="ImageSelector-template">
      <details>
        <summary>
          Select an Image
        </summary>
        <select></select>
      </details>
    </template>
    <script src="/ImageSelector.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'image-selector': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};