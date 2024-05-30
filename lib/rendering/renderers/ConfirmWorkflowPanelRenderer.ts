import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import generateId from '../../utilities/generate-id';
import Store from '../../store/Store';

export default class ConfirmWorkflowPanelRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'confirm-workflow-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.workflow = "workflow:1";
        data.principal = "mr_username";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.action = "/workflow/execute";
        data.testMode = Store.isTestContext();

        return renderingEngine.render('confirm-workflow-panel.ftl', data);
    }
}