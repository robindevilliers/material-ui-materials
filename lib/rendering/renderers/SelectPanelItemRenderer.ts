import { Renderer } from "../Renderer";
import { Element, isElement } from "../../xml-parser";
import Properties from "../Properties";
import RenderingEngine from "../RenderingEngine";
import { Substitutions } from "../Substitutions";
import ClassManager from "../ClassManager";
import { flexContainerSupport } from "../flex-container-support";
import Store from "../../store/Store";

export default class SelectPanelItemRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'select-panel-item';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const data: Record<string, any> = {};

        const children = element.children.filter(el => isElement(el)).map(el => el as Element);

        let representation = null;
        const childName = children[0].name;
        if (childName === 'card') {
            representation = 'Card';
        } else if (childName === 'text') {
            representation = 'Text';
        } else if (childName === 'image') {
            representation = 'Image';
        } else if (childName === 'icon') {
            representation = 'Icon';
        }

        data.name = parent?.attributes.reference;
        data.key = element.attributes.key;
        data.active = false;
        data.testMode = Store.isTestContext();
        data.representation = representation;
        data.content = renderingEngine.renderChildren(element);

        const classManager = new ClassManager(classMappings);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('select-panel-item.ftl', data);
    }
}

