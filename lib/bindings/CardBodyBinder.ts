import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import { flexContainerSupport } from '../flex-container-support';

import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';

export default class CardBodyBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'card-body';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('card-body.ftl', data);
    }
}
