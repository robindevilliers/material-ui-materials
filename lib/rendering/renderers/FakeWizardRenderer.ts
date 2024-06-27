import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import Wizard from '../../store/Wizard';

export default class FakeWizardRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-wizard';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.addWizard(new Wizard(
            element.attributes.name,
            element.attributes.version,
            element.attributes.title,
            element.attributes.description,
            element.attributes.active === "true",
            element.attributes.released === "true",
        ));

        return renderingEngine.renderChildren(element);
    }
}
