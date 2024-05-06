import { Renderer } from '../Renderer';
import { Element, isElement } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import generateId from '../utilities/generate-id';
import Store from '../store/Store';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class TrayBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'tray';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const children = element.children.filter(el => isElement(el)).map(el => el as Element);

        const trayHeader = children.find(el => el.name === "tray-header");

        const values = Store.getMessages().map(m => {

                const [wizardName, wizardVersion] = m.getWizardId().split(":");
                const wizard = Store.getWizards().find(w => w.getName() === wizardName && w.getVersion() === wizardVersion);

                const [workflowGroup, workflowName, workflowVersion] = m.getWorkflowId().split(":");
                const workflow = Store.getWorkflows().find(w => w.getGroup() === workflowGroup && w.getName() === workflowName && w.getVersion() === workflowVersion);

                return {
                    wipId: m.getWipId(),
                    wizardId: m.getWizardId(),
                    wizardTitle: wizard?.getTitle(),
                    wizardDescription: wizard?.getDescription(),
                    workflowId: m.getWorkflowId(),
                    workflowTitle: workflow?.getTitle(),
                    workflowDescription: workflow?.getDescription(),
                    date: m.getDateTime().substring(0, 10),
                    dateTime: m.getDateTime(),
                    principal: m.getPrincipal(),
                };
            }
        );

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.trayHeader = trayHeader ? renderingEngine.renderElement(trayHeader, element) : "";
        data.onclick = "alert('clicked'); event.preventDefault();";
        data.values = values;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('tray.ftl', data);
    }
}