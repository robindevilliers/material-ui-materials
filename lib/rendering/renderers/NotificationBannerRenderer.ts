import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import { flexContainerSupport } from '../flex-container-support';

import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class NotificationBannerRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'notification-banner';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.title = element.attributes.title;
        data.flavour = element.attributes.flavour;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'notification-banner-', 'notification-banner-default');
        flexItemSupport(data, classManager, element.attributes);
        flexContainerSupport(data, classManager, element);
        data.classes = classManager.toString();

        return renderingEngine.render('notification-banner.ftl', data);
    }

}
