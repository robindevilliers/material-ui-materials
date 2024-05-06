import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import { Errors } from '../Errors';
import generateId from '../utilities/generate-id';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class RegisterPanelBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'register-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};

        data.errors = new Errors([]);
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.timezones = [];
        data.nextOnclick = "alert('clicked'); event.preventDefault();";
        data.loginOnclick = "alert('clicked'); event.preventDefault();";
        data.cancelOnclick = "alert('clicked'); event.preventDefault();";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('register-panel.ftl', data);
    }

}
