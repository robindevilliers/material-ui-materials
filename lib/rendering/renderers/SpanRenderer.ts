import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import { textStyle } from '../text-style-support';
import RenderingEngine from '../RenderingEngine';

export default class SpanRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'span';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};

        data.paragraphStyle = element.attributes.paragraphStyle || 'PLAIN';
        data.content = renderingEngine.renderChildren(element);

        textStyle(data, element.attributes, classMappings);

        return renderingEngine.render('span.ftl', data);
    }
}