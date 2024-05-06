import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import { textStyleSupport } from '../text-style-support';

import Store from '../store/Store';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class LinkBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'link';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        textStyleSupport(data, classManager, element.attributes, classMappings);
        data.classes = classManager.toString();

        if (Store.isTestContext()) {
            data.link = 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';
        } else {

            if (element.attributes.view) {
                data.link = "/" + element.attributes.view;
            } else {
                data.link = element.attributes.url;
                data.rel = "noreferrer noopener";
                data.target = element.attributes.openNewWindow ? "_blank" : null;
            }
        }
        return renderingEngine.render('link.ftl', data);
    }
}