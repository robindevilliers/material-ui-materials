import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class ListRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'list';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        for (var node of element.children) {
            if (isElement(node)) {
                node.attributes.listStyle = element.attributes.listStyle;
            }
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.listStyle = element.attributes.listStyle || "BULLET";
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('list.ftl', data);
    }
}
