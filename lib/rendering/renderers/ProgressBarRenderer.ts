import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';

import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class ProgressBarRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'progress-bar';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const milestones = element.children.filter(el => isElement(el))
            .map(el => el as Element)
            .filter(el => el.name === 'mile-stone');

        if (milestones.length) {
            milestones[0].attributes.active = "true";
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.axis = element.attributes.axis;
        data.size = element.attributes.size;
        data.content = renderingEngine.renderChildren(element);


        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'progress-bar-', 'progress-bar-default');
        classManager.append(element.attributes.axis, 'progress-bar-axis-', '');
        classManager.append(element.attributes.labelSide, 'progress-bar-label-side-', '');
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('progress-bar.ftl', data);
    }
}