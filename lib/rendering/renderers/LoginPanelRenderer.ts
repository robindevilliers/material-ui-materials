import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import generateId from '../../utilities/generate-id';
import Store from '../../store/Store';

export default class LoginPanelRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'login-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data._csrf = generateId();
        data.enableRegistration = true;
        data.enablePrivacyPolicyAgreementOnLogin = true;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.action = "/authenticate";
        data.testMode = Store.isTestContext();

        data.errors = {
            username: 'Please supply the username',
            password: 'Please supply the password',
            acceptPrivacyPolicy: 'Please accept the privacy policy',
            global: 'Authentication failed',
        }

        return renderingEngine.render('login-panel.ftl', data);
    }
}