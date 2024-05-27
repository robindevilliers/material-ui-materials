import { Renderer } from '../Renderer';
import RenderingEngine from '../RenderingEngine';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
export default class AccordionBinder implements Renderer {
    accept(name: string): boolean;
    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string;
}
