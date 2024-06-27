import { Renderer } from '../Renderer';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { Element } from '../../xml-parser';
import Properties from '../Properties';

export default class AccordionRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'accordion';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.flush = element.attributes.flush === "true";
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('accordion.ftl', data);
    }
}
