import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import Properties from '../Properties';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
import ClassManager from '../ClassManager';
import flexItemSupport from '../flex-item-support';
import { RenderError } from '../RenderError';

export default class SwitchRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'switch';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const children = element.children.filter(el => isElement(el)).map(el => el as Element);

        let found = children.find(el => el.name === 'def');

        for (const child of children) {
            if (child.attributes.condition in substitutions && substitutions[child.attributes.condition].value) {
                found = child;
                break;
            }
        }

        if (found) {
            const data: Record<string, any> = {};
            data.id = element.attributes.id;
            data.content = renderingEngine.renderChildren(found);

            const classManager = new ClassManager(classMappings);
            flexItemSupport(data, classManager, element.attributes);
            data.classes = classManager.toString();

            return renderingEngine.render('switch.ftl', data);
        }
        return "";
    }
}