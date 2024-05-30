import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class TitleRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'title';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};

        data.id = element.attributes.id;
        data.size = element.attributes.size;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, classManager, element.attributes, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('title.ftl', data);
    }
}