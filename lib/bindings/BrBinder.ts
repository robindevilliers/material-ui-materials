import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class BrBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'br';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        return renderingEngine.render('br.ftl', {});
    }
}