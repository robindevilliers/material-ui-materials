import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../Properties';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';

export default class HeaderRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'header';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;

        textStyleSupport(data, element, classMappings);
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) && (el as Element).name === 'textual')! as Element);

        return renderingEngine.render('header.ftl', data);
    }
}