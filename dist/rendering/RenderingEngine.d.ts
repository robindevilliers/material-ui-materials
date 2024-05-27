import { Substitutions } from './Substitutions';
import Properties from './Properties';
import { Element } from '../xml-parser';
export default class RenderingEngine {
    private classMappings;
    private substitutions;
    private dir;
    constructor(classMappings: Properties, substitutions: Substitutions, dir: string);
    renderElement(element: Element, parent?: Element): string;
    renderChildren(element: Element): string;
    render(templateName: string, data: Record<string, any>): string;
}
