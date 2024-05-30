import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import { textStyleSupport } from '../text-style-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import generateId from '../../utilities/generate-id';
import Store from '../../store/Store';
import { RenderError } from '../RenderError';

export default class ConfirmationPanelRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'confirmation-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, classManager, element.attributes, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.action = "/authenticate-second-stage";
        data.testMode = Store.isTestContext();
        data.user = {
            firstName: 'Toddy',
            lastName: 'Anchor'
        }
        data.securityPhrase = "Once upon a midnight dreary"
        data.securityImage = "/public/img/temp0.jpg"
        data.firstPasswordPhraseIndex = "2"
        data.secondPasswordPhraseIndex = "5"
        data.thirdPasswordPhraseIndex = "8"

        data.errors = {
            firstCharacter: "Please supply a character",
            secondCharacter: "Please supply a character",
            thirdCharacter: "Please supply a character",
        }

        return renderingEngine.render('confirmation-panel.ftl', data);
    }
}