import { Renderer } from '../Renderer';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import { StringBuffer } from '../../utilities/StringBuffer';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
import { Element, isElement, isText } from '../../xml-parser';

export default class ToolTipRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'tool-tip';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const children = element.children.filter(node => !isText(node));

        if (children.length !== 1) {
            throw new Error("Tool tip element must have only 1 child.");
        }
        const child = children[0] as Element;

        element.attributes.alignSelf = child.attributes.alignSelf;
        element.attributes.flexBasis = child.attributes.flexBasis;
        element.attributes.flexGrow = child.attributes.flexGrow;
        element.attributes.flexShrink = child.attributes.flexShrink;
        element.attributes.height = child.attributes.height;
        element.attributes.width = child.attributes.width;
        element.attributes.margin = child.attributes.margin;
        element.attributes.backgroundFlavour = child.attributes.backgroundFlavour;
        element.attributes.borderRadius = child.attributes.borderRadius;

        delete child.attributes.alignSelf;
        delete child.attributes.flexBasis;
        delete child.attributes.flexGrow;
        delete child.attributes.flexShrink;
        delete child.attributes.height;
        delete child.attributes.width;
        delete child.attributes.margin;

        child.attributes.width = "100% ";
        child.attributes.height = "100% ";

        const output = new StringBuffer();
        element.children.forEach(child => {
            if (isText(child)) {
                output.append(child.text);
            } else if (isElement(child)) {
                output.append(renderingEngine.renderElement(child, element));
            }
        });

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.exposition = element.attributes.exposition;

        data.content = output.toString();

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('tool-tip.ftl', data);
    }
}
