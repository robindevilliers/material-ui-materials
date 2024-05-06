import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import { flexContainerSupport } from '../flex-container-support';

import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';


export default class WarningBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'warning';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('warning.ftl', data);
    }
}
