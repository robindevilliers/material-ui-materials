import { Renderer } from '../Renderer';
import { Element, isElement } from '../../xml-parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class TimezoneSelectRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'timezone-select';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.value = "";
        data.disabled = null;
        data.name = element.attributes.reference;
        data.size = element.attributes.size;
        data.error = "Input error message";
        data.content = renderingEngine.renderChildren(element.children.find(el => isElement(el) && (el as Element).name ===
            'textual')! as Element);
        data.value = "Europe/London";
        data.values = [{
            id: 'Europe/London',
            displayName: 'Greenwich Mean Time',
            offset: '+00:00'
        }, {
            id: 'Europe/Jersey',
            displayName: 'Greenwich Mean Time',
            offset: '+00:00'
        }, {
            id: 'Europe/St_Helena',
            displayName: 'Greenwich Mean Time',
            offset: '+00:00'
        }, {
            id: 'Europe/Guernsey',
            displayName: 'Greenwich Mean Time',
            offset: '+00:00'
        }, {
            id: 'Europe/Isle_of_Man',
            displayName: 'Greenwich Mean Time',
            offset: '+00:00'
        }];

        const classManager = new ClassManager(classMappings);
        textStyleSupport(data, element, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('timezone-select.ftl', data);
    }
}
