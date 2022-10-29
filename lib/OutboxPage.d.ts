/// <reference types="react" />
import { AP } from 'activitypub-core-types';
export declare function OutboxPage({ headingLevel, collection, user }: {
    collection: AP.OrderedCollection;
    user?: AP.Actor;
    headingLevel: number;
}): JSX.Element;
