import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Store from '../store/Store';
import Message from '../store/Message';
import generateId from '../utilities/generate-id';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class FakeMessageBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-message';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.addMessage(new Message(
            generateId(),
            element.attributes.dateTime,
            generateId(),
            element.attributes.kaseId,
            element.attributes.wizardId,
            element.attributes.workflowId,
            element.attributes.group,
            element.attributes.queue,
            element.attributes.principal,
            generateId(),
            new Date().getTime()
        ));

        return renderingEngine.renderChildren(element);
    }
}
