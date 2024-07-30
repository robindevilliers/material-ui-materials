import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';

import generateId from '../../utilities/generate-id';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import { RenderError } from '../RenderError';

export default class InitiateWorkflowButtonRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'initiate-workflow-button';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.size = element.attributes.size;
        data.disabled = null;
        data.showCasePrincipalPicker = element.attributes.showCasePrincipalPicker === "true";
        data.action = "/workflow/initiate/" + element.attributes.workflow;

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.buttonFlavour, 'btn-', 'btn-default');
        classManager.append(element.attributes.size, 'btn-', '');
        textStyleSupport(data, element, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) && (el as Element).name === 'textual')! as Element);

        return renderingEngine.render('initiate-workflow-button.ftl', data);
    }
}
