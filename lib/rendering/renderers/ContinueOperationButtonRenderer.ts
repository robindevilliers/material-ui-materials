import { Renderer } from "../Renderer";
import { Element, isElement } from "../../xml-parser";
import Properties from "../Properties";
import RenderingEngine from "../RenderingEngine";
import { Substitutions } from "../Substitutions";
import { RenderError } from "../RenderError";
import generateId from "../../utilities/generate-id";
import ClassManager from "../ClassManager";
import { textStyleSupport } from "../text-style-support";
import flexItemSupport from "../flex-item-support";
import Store from "../../store/Store";

export default class ContinueOperationButtonRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'continue-operation-button';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.size = element.attributes.size;
        data.disabled = null;
        data.action = "/continue-operation/" + generateId();
        data.type = "ACCEPT";

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.buttonFlavour, 'btn-', 'btn-default');
        classManager.append(element.attributes.size, 'btn-', '');
        textStyleSupport(data, element, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) &&
            (el as Element).name === 'textual')! as Element);

        return renderingEngine.render('operation-button.ftl', data);
    }
}