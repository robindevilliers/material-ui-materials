import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import generateId from '../../utilities/generate-id';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';

export default class UuidRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'uuid';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.name = element.attributes.reference;
        data.value = generateId();
        return renderingEngine.render('uuid.ftl', data);
    }
}