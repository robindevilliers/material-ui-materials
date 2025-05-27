import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import generateId from '../../utilities/generate-id';
import flexItemSupport from '../flex-item-support';
import Store from '../../store/Store';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class UserExplorerRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'user-explorer';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data._csrf = generateId();
        data.bust = generateId();
        data.values = Store.getUsers();
        data.groups = Store.getGroups();
        data.group = "";
        data.wizard = "";
        data.workflow = "";
        data.queue = "";
        data.principal = "";
        data.username = "";
        data.firstName = "";
        data.lastName = "";
        data.executeWorkflow = "/workflow/initiate-as/";
        data.messageExplorerMode = false;
        data.startIndex = "startIndex";
        data.endIndex = "endIndex";
        data.parameters = {};

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.action = "#" + data.bust;
        data.testMode = Store.isTestContext();

        return renderingEngine.render('user-explorer.ftl', data);
    }
}
