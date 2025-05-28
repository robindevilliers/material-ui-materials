import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';
import Store from '../../store/Store';
import generateId from '../../utilities/generate-id';
import Kase from "../../store/Kase";

export default class FakeKaseRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'fake-kase';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        Store.addKase(new Kase(
            generateId(),
            element.attributes.dateTime,
            element.attributes.kaseId,
            element.attributes.workflowId,
            element.attributes.principal,
            new Date().getTime()
        ));

        return renderingEngine.renderChildren(element);
    }
}
