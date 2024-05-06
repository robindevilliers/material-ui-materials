import { Renderer } from '../Renderer';
import { Element } from '../parser';
import generateId from '../utilities/generate-id';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class UuidBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'uuid';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.reference = element.attributes.reference;
        data.value = generateId();
        return renderingEngine.render('uuid.ftl', data);
    }
}