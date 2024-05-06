import { Element } from './parser';
import Properties from './properties';
import { Substitutions } from './Substitutions';
export interface Binder {
    accept(name: string): boolean;
    bind(element: Element, classMappings: Properties, substitutions: Substitutions, parent: Element | undefined): Record<string, any> | undefined;
}
