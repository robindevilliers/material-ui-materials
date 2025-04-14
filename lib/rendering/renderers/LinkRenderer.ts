import { Renderer } from '../Renderer';
import { Element, isText } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import Store from '../../store/Store';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class LinkRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'link';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();

        const child = element.children.filter(c => !isText(c))[0] as Element;
        data.representation = child.name;

        data.content = renderingEngine.renderChildren(element);

        if (Store.isTestContext()) {
            data.href = 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';
        } else {

            if (element.attributes.view) {
                data.href = "/" + element.attributes.view;
            } else {
                data.href = element.attributes.url;
                data.rel = "noreferrer noopener";
                data.target = element.attributes.openNewWindow ? "_blank" : null;
            }
        }
        return renderingEngine.render('link.ftl', data);
    }
}