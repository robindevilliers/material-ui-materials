import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import generateId from '../../utilities/generate-id';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';

export default class ResetPasswordPanelRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'reset-password-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data._csrf = generateId();
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.action = "/reset-password";
        data.testMode = Store.isTestContext();

        data.errors = {
            passwordOnce: "Passwords do not match",
            passwordTwice: "Please supply the password (again)"
        }

        return renderingEngine.render('reset-password-panel.ftl', data);
    }
}
