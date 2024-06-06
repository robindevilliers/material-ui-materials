import { Renderer } from '../Renderer';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { Element, isElement, isText } from '../../xml-parser';
import { StringBuffer } from '../../utilities/StringBuffer';
import Store from '../../store/Store';
import { RenderError } from '../RenderError';
import generateId from '../../utilities/generate-id';

export default class CardRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'card';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.type = element.attributes.type;

        if (element.attributes.type === 'page') {
            if (Store.isTestContext()) {
                data.href = 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';
            } else {
                data.href = '/' + element.attributes.page;
            }
        } else if (element.attributes.type === 'url') {
            data.href = element.attributes.url;
        } else if (element.attributes.type === 'workflow') {
            data._csrf = generateId();
            data.action = "/workflow/initiate/" + element.attributes.workflow;
        }

        data.rel = '';
        if (element.attributes.openNewWindow === 'true') {
            data.target = "_blank";
        }

        const output = new StringBuffer();
        element.children.forEach(child => {
            if (isText(child)) {
                output.append(child.text);
            } else if (isElement(child)) {
                if (child.name === 'card-header') {
                    data.headerContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'image') {
                    data.imageContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'card-body') {
                    data.bodyContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'card-footer') {
                    data.footerContent = renderingEngine.renderElement(child, element);
                }
            }
        });
        data.showCasePrincipalPicker = element.attributes.showCasePrincipalPicker === "true";

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'card-', 'card-default');
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();

        return renderingEngine.render('card.ftl', data);
    }
}