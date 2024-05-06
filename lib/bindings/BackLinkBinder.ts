import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class BackLinkBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'back-link';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data.backLinkOnclick = "alert('clicked'); event.preventDefault();";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('back-link.ftl', data);
    }
}
