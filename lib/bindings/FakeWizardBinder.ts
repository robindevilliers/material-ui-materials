import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Store from '../store/Store';
import Wizard from '../store/Wizard';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class FakeWizardBinder implements Renderer {
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
