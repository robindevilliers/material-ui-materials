import { Renderer } from '../Renderer';
import { Element } from '../parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';

import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';


export default class BadgeBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'badge';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.size = element.attributes.size;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'badge-', 'badge-default');
        textStyleSupport(data, classManager, element.attributes, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('badge.ftl', data);
    }
}