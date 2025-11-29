import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
import { flexContainerSupport } from "../flex-container-support";
import { RenderError } from "../RenderError";
import flexItemSupport from "../flex-item-support";

export default class MenuItemRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'menu-item';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const isInSubMenu = parent!.name === "sub-menu";
        if (isInSubMenu) {
            parent!.attributes.hasContent = "true";
        }


        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);
        data.isInSubMenu = isInSubMenu;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        flexContainerSupport(data, classManager, element);
        data.classes = classManager.toString();

        return renderingEngine.render('menu-item.ftl', data);
    }
}