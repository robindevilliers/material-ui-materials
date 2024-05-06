import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';

import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class TableBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'table';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.size = element.attributes.size;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('table.ftl', data);
    }
}
