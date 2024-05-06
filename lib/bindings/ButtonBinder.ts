import { Renderer } from '../Renderer';
import { Element } from '../parser';
import { textStyleSupport } from '../text-style-support';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';

import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';

export default class ButtonBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'button';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.size = element.attributes.size;
        data.disabled = null;
        data.content = renderingEngine.renderChildren(element);
        data.onclick = "alert('clicked'); event.preventDefault();";
        data.name = "_NAME_";

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.size, 'btn-', '');
        classManager.append(element.attributes.buttonFlavour, 'btn-', 'btn-default');
        textStyleSupport(data, classManager, element.attributes, classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('button.ftl', data);
    }
}