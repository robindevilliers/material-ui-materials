import { Renderer } from '../Renderer';
import Properties from '../Properties';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
import { Element } from '../../xml-parser';
export default class MileStoneRenderer implements Renderer {
    accept(name: string): boolean;
    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string;
}
