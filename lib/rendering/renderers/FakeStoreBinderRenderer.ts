import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';

export default class FakeStoreBinderRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-store';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.clear();
        Store.setTestContext();

        return renderingEngine.renderChildren(element);
    }
}
