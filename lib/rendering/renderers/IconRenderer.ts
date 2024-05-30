import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class IconRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'icon';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.name = element.attributes.name;
        data.size = element.attributes.size;

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'icon-', 'icon-default');
        classManager.append(element.attributes.size, 'icon-size-', 'icon-size-medium');
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('icon.ftl', data);
    }
}
