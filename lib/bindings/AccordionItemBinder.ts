import { Renderer } from '../Renderer';
import { Element, isElement, isText } from '../parser';
import Properties from '../properties';
import { flexContainerSupport } from '../flex-container-support';
import { StringBuffer } from '../utilities/StringBuffer';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';

export default class AccordionItemBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'accordion-item';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;

        data.active = element.attributes.active === "true";
        data.singleActive = parent?.attributes.singleActive === "true";
        data.accordionId = parent?.attributes.id;
        data.size = element.attributes.size;


        const output = new StringBuffer();
        element.children.forEach(child => {
            if (isText(child)) {
                output.append(child.text);
            } else if (isElement(child)) {
                if (child.name === 'accordion-item-header') {
                    data.header = renderingEngine.renderElement(child, element);
                } else {
                    output.append(renderingEngine.renderElement(child, element));
                }
            }
        });

        data.content = output.toString();

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.backgroundFlavour, 'bg-', '');
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('accordion-item.ftl', data);
    }
}

