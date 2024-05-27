import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import { flexContainerSupport } from '../flex-container-support';

import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class FormRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'form';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.action = "#"

        return renderingEngine.render('form.ftl', data);
    }
}
