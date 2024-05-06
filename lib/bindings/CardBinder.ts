import { Renderer } from '../Renderer';
import { Element, isElement, isText } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import { StringBuffer } from '../utilities/StringBuffer';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';

export default class CardBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'card';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {


        const data: Record<string, any> = {};
        data.id = element.attributes.id;

        data.isLink = !!element.attributes.link;
        const preserveLink = element.attributes.preserveLink === "true";
        data.link = preserveLink ? '/' + element.attributes.view : 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';
        data.rel = '';
        data.target = '';

        const output = new StringBuffer();
        element.children.forEach(child => {
            if (isText(child)) {
                output.append(child.text);
            } else if (isElement(child)) {
                if (child.name === 'card-header') {
                    data.headerContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'image') {
                    data.imageContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'card-body') {
                    data.bodyContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'card-footer') {
                    data.footerContent = renderingEngine.renderElement(child, element);
                }
            }
        });

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'card-', 'card-default');
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('card.ftl', data);
    }
}