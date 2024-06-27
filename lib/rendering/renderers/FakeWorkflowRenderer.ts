import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import Workflow from '../../store/Workflow';

export default class FakeWorkflowRenderer implements Renderer {
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
