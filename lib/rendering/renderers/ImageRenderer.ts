import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class ImageRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'image';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data.src = "/public/img/" + element.attributes.src;
        data.alt = element.attributes['alt'] || '';


        let imageStyles = '';

        if ('padding' in element.attributes) {
            imageStyles += 'padding: ' + element.attributes['padding'] + '; ';
        }

        if ('border' in element.attributes) {
            imageStyles += 'border: ' + element.attributes['border'] + '; ';
        }

        if ('borderRadius' in element.attributes) {
            imageStyles += 'border-radius: ' + element.attributes.borderRadius + '; ';
        }

        if ('objectFit' in element.attributes) {
            imageStyles += 'object-fit: ' + element.attributes.objectFit + '; ';
        }

        if ('object-position' in element.attributes) {
            imageStyles += 'object-position: ' + element.attributes.objectPosition + '; ';
        }

        if ('opacity' in element.attributes) {
            imageStyles += 'opacity: ' + element.attributes['opacity'] + '; ';
        }

        if ('background' in element.attributes) {
            imageStyles += 'background: ' + element.attributes['background'] + '; ';
        }
        data.imageStyles = imageStyles;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('image.ftl', data);
    }
}
