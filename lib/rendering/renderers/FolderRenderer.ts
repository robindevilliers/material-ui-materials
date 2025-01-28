import { Renderer } from "../Renderer";
import { Element, isElement } from "../../xml-parser";
import Properties from "../Properties";
import RenderingEngine from "../RenderingEngine";
import { RenderError } from "../RenderError";
import Store from "../../store/Store";
import generateId from "../../utilities/generate-id";
import ClassManager from "../ClassManager";
import flexItemSupport from "../flex-item-support";
import { StringBuffer } from "../../utilities/StringBuffer";

export default class FolderRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'folder';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const children = element.children.filter(el => isElement(el)).map(el => el as Element);

        const header = children.find(el => el.name === "header");

        const values = Store.getMessages().map(m => {

            const buffer = new StringBuffer();
            for (let i = 0; i < children.length; i++) {
                const child = children[i];

                if (child.name != "header") {
                    buffer.append(renderingEngine.renderElement(child, element));
                }
            }

            return {
                wipId: m.getWipId(),
                wizardId: m.getWizardId(),
                workflowId: m.getWorkflowId(),
                html: buffer.toString()
            };
        });

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data._csrf = generateId();
        data.header = header ? renderingEngine.renderElement(header, element) : "";
        data.values = values;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();

        data.pageSize = 20;
        data.currentPage = 2;
        data.previousPage = 1;
        data.nextPage = 3;
        data.offeredPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return renderingEngine.render('folder.ftl', data);
    }
}