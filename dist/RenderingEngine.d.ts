import { Substitutions } from './Substitutions';
import Properties from './properties';
import { Element } from './parser';
export default class RenderingEngine {
    private file;
    private classMappings;
    private substitutions;
    private dir;
    constructor(file: string, classMappings: Properties, substitutions: Substitutions, dir: string);
    renderElement(element: Element, parent?: Element): string;
    renderChildren(element: Element): string;
    render(templateName: string, data: Record<string, any>): string;
}
