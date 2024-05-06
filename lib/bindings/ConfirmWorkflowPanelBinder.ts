import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import { Errors, FieldError } from '../Errors';
import generateId from '../utilities/generate-id';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class ConfirmWorkflowPanelBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'confirm-workflow-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};

        data.errors = new Errors([
            new FieldError("this", "username", "", "Invalid username supplied")
        ]);
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.workflow = "workflow:1";
        data.principal = "mr_username";

        data.confirmOnclick = "alert('clicked'); event.preventDefault();";
        data.cancelOnclick = "alert('clicked'); event.preventDefault();";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('confirm-workflow-panel.ftl', data);
    }
}