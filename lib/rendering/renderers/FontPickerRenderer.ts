import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { textStyleSupport } from "../text-style-support";


export default class FontPickerRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'font-picker';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);
        data.name = 'fonts';

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, element, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.error = "Font Picker error message";

        return renderingEngine.render('font-picker.ftl', data);
    }
}