import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import Store from '../store/Store';
import Page from '../store/Page';
import RenderingEngine from '../RenderingEngine';

export default class FakePageBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-page';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.addPage(new Page(
            element.attributes.name,
            element.attributes.version,
            element.attributes.group,
            element.attributes.title,
            element.attributes.description,
        ));

        return renderingEngine.renderChildren(element);
    }
}
