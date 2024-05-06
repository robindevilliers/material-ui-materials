import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import generateId from '../utilities/generate-id';
import flexItemSupport from '../flex-item-support';
import Store from '../store/Store';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class UserExplorerBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'user-explorer';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data._csrf = generateId();
        data.bust = generateId();
        data.onclick = "alert('clicked'); event.preventDefault();";
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
        data.executeWorkflow = "";
        data.messageExplorerMode = false;
        data.startIndex = "startIndex";
        data.endIndex = "endIndex";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('user-explorer.ftl', data);
    }
}
