import { Renderer } from '../Renderer';
import Store from '../store/Store';
import { Element } from '../parser';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class FakeStoreBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-store';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.clear();
        Store.setTestContext();

        return renderingEngine.renderChildren(element);
    }
}
