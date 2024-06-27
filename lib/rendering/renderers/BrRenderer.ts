import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';

export default class BrRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'br';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        return renderingEngine.render('br.ftl', {});
    }
}