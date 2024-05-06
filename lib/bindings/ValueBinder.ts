import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import { flexContainerSupport } from '../flex-container-support';

import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';


export default class ValueBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'value';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const data: Record<string, any> = {};
        data.id = parent!.attributes.id;
        data.key = element.attributes.key;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        return renderingEngine.render('value-panel.ftl', data);
    }
}