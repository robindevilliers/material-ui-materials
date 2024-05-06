import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import { textStyleSupport } from '../text-style-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class EmailConfirmationLinkBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'email-confirmation-link';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = element.attributes.label;
        data.link = 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, classManager, element.attributes, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('email-confirmation-link.ftl', data);
    }
}