import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class RowBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'row';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);

        return renderingEngine.render('row.ftl', data);
    }
}