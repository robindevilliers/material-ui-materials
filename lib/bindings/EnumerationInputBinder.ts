import { Renderer } from '../Renderer';
import { Element, isElement } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';


export default class EnumerationInputBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'enumeration-input';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.value = "";
        data.disabled = null;
        data.label = element.attributes.label;
        data.type = element.attributes.type;
        data.reference = element.attributes.reference;
        data.size = element.attributes.size;
        data.style = element.attributes.style;
        data.cardinality = element.attributes.cardinality;

        const values = element.children
            .filter(n => isElement(n))
            .map(n => (n as Element))
            .filter(n => n.name === 'value');

        if (element.attributes.cardinality === 'MULTIPLE_SELECT') {
            data.value = values
                .filter(n => n.attributes.default === 'true')
                .map(n => n.attributes.key);
        } else {
            data.value = values
                .filter(n => n.attributes.default === 'true')
                .map(n => n.attributes.key)
                .find(n => true) || null;
        }

        data.panels = values.find(n => n.attributes.panel === 'true');

        data.values = values.map(value => ({
            key: value.attributes.key,
            label: value.attributes.label,
            panel: renderingEngine.renderElement(value, element)
        }));

        data.error = new Error("some error message");

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('enumeration-input.ftl', data);
    }
}