import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import Queue from '../../store/Queue';
import Store from '../../store/Store';

export default class FakeQueueRenderer implements Renderer {
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
