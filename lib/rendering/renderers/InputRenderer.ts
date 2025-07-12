import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class InputRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'input';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.value = element.attributes.value;
        data.disabled = null;
        data.type = element.attributes.type;
        data.name = element.attributes.reference;
        data.min = element.attributes.min;
        data.max = element.attributes.max;
        data.cols = element.attributes.cols;
        data.rows = element.attributes.rows;
        data.size = element.attributes.size;
        data.maxLength = element.attributes.maxLength;
        data.currencySymbol = element.attributes.type === 'CURRENCY' ? '£' : null;
        data.error = "Input error message";
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) && (el as Element).name === 'textual')! as Element);

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, element, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('input.ftl', data);
    }
}
