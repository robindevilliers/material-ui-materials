import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { textStyleSupport } from '../text-style-support';
import { RenderError } from '../RenderError';

export default class TextRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'text';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};

        data.paragraphStyle = element.attributes.paragraphStyle || 'PLAIN';

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        textStyleSupport(data, element, classMappings);
        data.classes = classManager.toString();
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) && (el as Element).name === 'textual')! as Element);

        return renderingEngine.render('text.ftl', data);
    }
}