import { Renderer } from '../Renderer';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import { Element } from '../../xml-parser';
export default class CardRenderer implements Renderer {
    accept(name: string): boolean;
    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string;
}
