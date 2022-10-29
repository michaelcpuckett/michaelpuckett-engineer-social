/// <reference types="react" />
/// <reference types="react" />
export declare function BlogPostTemplate({ headingLevel }: {
    headingLevel: number;
}): JSX.Element;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'blog-post': Partial<HTMLElement & {
                children: string | HTMLElement;
            }>;
        }
    }
}
