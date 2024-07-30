import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../Properties';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class ColumnRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'column';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        if (element.attributes.width) {
            data.columnStyles = `width: ${element.attributes.width}; `
        }

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, element, classMappings);
        data.classes = classManager.toString();
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) && (el as Element).name === 'textual')! as Element);

        return renderingEngine.render('column.ftl', data);
    }
}