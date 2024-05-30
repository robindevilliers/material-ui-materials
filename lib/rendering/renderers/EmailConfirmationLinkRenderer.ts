import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import { textStyleSupport } from '../text-style-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import { RenderError } from '../RenderError';

export default class EmailConfirmationLinkRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'email-confirmation-link';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = element.attributes.label;
        data.href = 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';
        data.testMode = Store.isTestContext();

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, classManager, element.attributes, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('email-confirmation-link.ftl', data);
    }
}