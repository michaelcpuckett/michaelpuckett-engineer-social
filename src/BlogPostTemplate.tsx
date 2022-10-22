import React, { ReactElement } from 'react';

export function BlogPostTemplate({ headingLevel }: { headingLevel: number }) {
  return <>
    <template id="BlogPost-template">
      <div className="BlogPost">
        <span role="heading" aria-level={headingLevel + 1}>
          <slot name="summary"></slot>
        </span>
        <slot name="content"></slot>
        <slot name="published"></slot>
        <slot name="likeButton"></slot>
      </div>
      <style>
        {`
          :host(.card) .BlogPost {
            border: 1px solid;
            padding: 12px;
            border-radius: 6px;
          }
        `}
      </style>
    </template>
    <script src="/BlogPost.js" type="module"></script>
  </>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'blog-post': Partial<HTMLElement & { children: string|HTMLElement }>;
    }
  }
};