import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import generateId from '../utilities/generate-id';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class CookieConsentBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'cookie-consent';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.allowCookiesOnclick = "alert('clicked'); event.preventDefault();";
        data.privacyPolicyOnclick = "alert('clicked'); event.preventDefault();";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('cookie-consent.ftl', data);
    }
}