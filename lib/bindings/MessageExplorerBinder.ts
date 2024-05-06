import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import generateId from '../utilities/generate-id';
import flexItemSupport from '../flex-item-support';
import Store from '../store/Store';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class MessageExplorerBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'message-explorer';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

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
        data.bust = generateId();
        data.onclick = "alert('clicked'); event.preventDefault();";
        data.values = values;
        data.wizard = "";
        data.queue = "";
        data.workflow = "";
        data.principal = "";
        data.groups = ["public, authenticated"];
        data.startIndex = "0";
        data.endIndex = String(Number.MAX_VALUE);

        data.workflows = Store.getWorkflows().map(w => {
            return {
                id: w.getGroup() + ":" + w.getName() + ":" + w.getVersion(),
                title: w.getTitle()
            };
        });

        data.wizards = Store.getWizards().map(w => {
            return {
                id: w.getName() + ":" + w.getVersion(),
                title: w.getTitle()
            };
        });

        data.queues = Store.getQueues();

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('message-explorer.ftl', data);
    }
}
