import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import Page from '../../store/Page';

export default class FakePageRenderer implements Renderer {
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
