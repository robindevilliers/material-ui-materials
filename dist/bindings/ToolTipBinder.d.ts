import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
export default class ToolTipBinder implements Renderer {
    accept(name: string): boolean;
    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string;
}
