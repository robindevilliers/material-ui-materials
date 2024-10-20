import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
export default class PaginationRenderer implements Renderer {
    accept(name: string): boolean;
    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions): string;
}
