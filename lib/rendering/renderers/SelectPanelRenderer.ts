import { Renderer } from '../Renderer';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { Element, isElement } from '../../xml-parser';
import Properties from '../Properties';
import { RenderError } from '../RenderError';
import generateId from "../../utilities/generate-id";
import { textStyleSupport } from "../text-style-support";
import { StringBuffer } from "../../utilities/StringBuffer";

export default class SelectPanelRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'select-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const children = element.children.filter(el => isElement(el)).map(el => el as Element);

        let label, content = new StringBuffer();
        for (const child of children) {
            if (child.name == 'textual') {
                label = renderingEngine.renderElement(child, element);
            } else {
                content.append(renderingEngine.renderElement(child, element));
            }
        }

        const data: Record<string, any> = {};
        data.id = generateId();
        data.cardinality = "MULTI_SELECT";
        data.disabled = false;
        data.label = label;

        data.content = content;
        textStyleSupport(data, element, classMappings);

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();


        return renderingEngine.render('select-panel.ftl', data);
    }
}