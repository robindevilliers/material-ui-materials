import { Renderer } from '../Renderer';
import { Element } from '../parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';

import generateId from '../utilities/generate-id';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';

export default class InitiateWorkflowButtonBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'initiate-workflow-button';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.size = element.attributes.size;
        data.disabled = null;
        data.content = renderingEngine.renderChildren(element);
        data.onclick = "alert('clicked'); event.preventDefault();";
        data.showCasePrincipalPicker = element.attributes.showCasePrincipalPicker === "true";
        data.workflow = element.attributes.workflow;

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.buttonFlavour, 'btn-', 'btn-default');
        classManager.append(element.attributes.size, 'btn-', '');
        textStyleSupport(data, classManager, element.attributes, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('initiate-workflow-button.ftl', data);
    }
}
