/// <reference types="react" />
/// <reference types="react" />
export declare function ImageSelectorTemplate({}: {}): JSX.Element;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'image-selector': Partial<HTMLElement & {
                children: string | HTMLElement;
            }>;
        }
    }
}
