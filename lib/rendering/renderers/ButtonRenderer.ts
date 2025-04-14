import { Renderer } from '../Renderer';
import { Element, isText } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import { RenderError } from '../RenderError';

export default class ButtonRenderer implements Renderer {
    accept(name: string): boolean {
        return [
            'submit-button',
            'transfer-wip-button',
            'abandon-wip-button',
            'payment-button',
            'save-button',
            'array-append-button',
            'array-item-replace-button',
            'array-item-delete-button',
            'merge-button',
            'open-wip-button',
            'open-wip-page-button',
            'cancel-button',
            'accept-button'
        ].includes(name);
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.size = element.attributes.size;
        data.disabled = null;
        data.name = "__button:";
        data.testMode = Store.isTestContext();
        data.runningWizardTest = false;

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.size, 'btn-', '');
        classManager.append(element.attributes.buttonFlavour, 'btn-', 'btn-default');
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        const child = element.children.filter(c => !isText(c))[0] as Element;
        data.representation = child.name;

        data.content = data.content = renderingEngine.renderChildren(element);

        return renderingEngine.render('button.ftl', data);
    }
}