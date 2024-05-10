import { Renderer } from '../Renderer';
import { Element, isElement } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import { flexContainerSupport } from '../flex-container-support';
import { StringBuffer } from '../utilities/StringBuffer';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';


export default class MenuBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'menu';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const children = element.children.filter(el => isElement(el)).map(el => el as Element);

        const menuBrand = children.find(el => el.name === 'menu-brand');
        let menuBrandContent = menuBrand ? renderingEngine.renderElement(menuBrand, element) : "";

        const menuItems = children.filter(el => el.name === 'menu-item' || el.name === 'sub-menu');

        const content = new StringBuffer();
        for (const child of menuItems) {
            content.append(renderingEngine.renderElement(child, element));
        }

        let expand = "";

        if (element.attributes.axis === 'HORIZONTAL') {
            if (menuItems.length > 5) {
                expand = "navbar-expand-lg";
            } else if (menuItems.length > 3) {
                expand = "navbar-expand-md";
            } else {
                expand = "navbar-expand-sm";
            }
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.menuBrand = menuBrandContent;
        data.axis = element.attributes.axis || 'VERTICAL';
        data.content = content.toString();
        data.expand = expand;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('menu.ftl', data);
    }
}