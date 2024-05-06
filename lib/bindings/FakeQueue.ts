import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Store from '../store/Store';
import Queue from '../store/Queue';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class FakeQueueBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-queue';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.addQueue(new Queue(
            element.attributes.name,
            element.attributes.title,
            element.attributes.description
        ));

        return renderingEngine.renderChildren(element);
    }
}
