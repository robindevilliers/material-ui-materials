import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
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
        data.href = 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';
        data.testMode = Store.isTestContext();

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, element, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) && (el as Element).name === 'textual')! as Element);

        return renderingEngine.render('email-confirmation-link.ftl', data);
    }
}