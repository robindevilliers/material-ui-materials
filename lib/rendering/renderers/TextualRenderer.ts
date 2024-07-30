import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';

export default class TextualRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'textual';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        return renderingEngine.renderChildren(element);
    }
}