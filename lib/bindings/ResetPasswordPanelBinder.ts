import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import generateId from '../utilities/generate-id';

import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class ResetPasswordPanelBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'reset-password-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data._csrf = generateId();
        data.content = renderingEngine.renderChildren(element);
        data.nextOnclick = "alert('clicked'); event.preventDefault();";
        data.cancelOnclick = "alert('clicked'); event.preventDefault();";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('reset-password-panel.ftl', data);
    }
}
