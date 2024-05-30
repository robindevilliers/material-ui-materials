import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import Group from '../../store/Group';

export default class FakeGroupRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-group';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.addGroup(new Group(
            element.attributes.name,
            element.attributes.title,
            element.attributes.description,
            element.attributes.has ? element.attributes.has.split(",") : [],
        ));

        return renderingEngine.renderChildren(element);
    }
}
