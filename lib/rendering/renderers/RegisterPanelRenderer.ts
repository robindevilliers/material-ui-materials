import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import generateId from '../../utilities/generate-id';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import { RenderError } from '../RenderError';

export default class RegisterPanelRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'register-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data._csrf = generateId();
        data.timezones = [];
        data.action = "/register";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();

        data.title = "Mr";
        data.username = "arny";
        data.firstName = "Arnold";
        data.lastName = "Archer";
        data.email = "arny@me.com";
        data.contactNumber = "(98) 02837 18237 283";
        data.dateOfBirth = "2001-01-01";
        data.passwordOnce = "test1";
        data.passwordTwice = "test1";
        data.timezone = "GMT";
        data.isAcceptPrivacyPolicy = false;
        data.errors = {
            global: "Only adults are allowed to register.",
            title: 'Please supply the title',
            username: 'Please supply the username',
            firstName: 'Please supply the firstName',
            lastName: 'Please supply the lastName',
            email: 'Please supply the email',
            contactNumber: 'Please supply the contactNumber',
            dateOfBirth: 'Please supply the dateOfBirth',
            passwordOnce: 'Please supply the passwordOnce',
            passwordTwice: 'Please supply the passwordTwice',
            timezone: 'Please supply the timezone',
            acceptPrivacyPolicy: 'Please accept the privacy policy',
        }

        return renderingEngine.render('register-panel.ftl', data);
    }

}
