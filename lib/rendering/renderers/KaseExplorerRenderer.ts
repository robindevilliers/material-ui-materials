import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import Store from '../../store/Store';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import generateId from '../../utilities/generate-id';
import { RenderError } from '../RenderError';

export default class KaseExplorerRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'kase-explorer';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const values = Store.getKases().map(m => {

                const [workflowGroup, workflowName, workflowVersion] = m.getWorkflowId().split(":");
                const workflow = Store.getWorkflows().find(w => w.getGroup() === workflowGroup && w.getName() === workflowName &&
                    w.getVersion() === workflowVersion);

                return {
                    id: generateId(),
                    kaseId: m.getKaseId(),
                    workflowId: m.getWorkflowId(),
                    workflowTitle: workflow?.getTitle(),
                    workflowDescription: workflow?.getDescription(),
                    date: m.getDateTime().substring(0, 10),
                    dateTime: m.getDateTime(),
                    principal: m.getPrincipal(),
                    action: "/operation/case-explorer-open-case",
                    payload: ''
                };
            }
        );

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data._checkpoint = "17e3422d-0197-1000-b8bc-989daa23ef9c";
        data.source = "";
        data.values = values;
        data.workflow = "";
        data.principal = "";
        data.startDate = "";
        data.endDate = "";
        data.action = "#" + generateId();
        data.parameters = {};

        data.workflows = Store.getWorkflows().map(w => {
            return {
                id: w.getGroup() + ":" + w.getName() + ":" + w.getVersion(),
                title: w.getTitle()
            };
        });

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();
        data.disablePrevious = false;
        data.disableNext = false;

        return renderingEngine.render('kase-explorer.ftl', data);
    }
}
