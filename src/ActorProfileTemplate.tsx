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
      </div>
      <style>
        {`
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

  ::slotted(img) { 
    border-radius: 100%;
    max-width: 50%;
  }
  
        `}
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