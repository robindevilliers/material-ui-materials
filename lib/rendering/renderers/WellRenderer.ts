import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import { flexContainerSupport } from '../flex-container-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class WellRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'well';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'well-', 'well-default');
        flexItemSupport(data, classManager, element.attributes);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('well.ftl', data);
    }
}