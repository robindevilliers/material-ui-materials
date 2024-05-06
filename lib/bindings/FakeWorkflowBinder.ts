import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Store from '../store/Store';
import Workflow from '../store/Workflow';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class FakeWorkflowBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-workflow';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.addWorkflow(new Workflow(
            element.attributes.name,
            element.attributes.version,
            element.attributes.group,
            element.attributes.title,
            element.attributes.description,
        ));

        return renderingEngine.renderChildren(element);
    }
}
