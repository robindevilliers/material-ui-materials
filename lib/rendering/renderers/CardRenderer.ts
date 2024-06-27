import { Renderer } from '../Renderer';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { Element, isElement, isText } from '../../xml-parser';
import { StringBuffer } from '../../utilities/StringBuffer';
import Store from '../../store/Store';

export default class CardRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'card';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {


        const data: Record<string, any> = {};
        data.id = element.attributes.id;

        if (element.attributes.view){
            if (Store.isTestContext()) {
                data.href = 'javascript:alert(&quot;link was clicked&quot;); event.preventDefault();';
            } else {
                data.href = '/' + element.attributes.view;
            }
        }

        data.rel = '';
        data.target = '';

        const output = new StringBuffer();
        element.children.forEach(child => {
            if (isText(child)) {
                output.append(child.text);
            } else if (isElement(child)) {
                if (child.name === 'card-header') {
                    data.headerContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'image') {
                    data.imageContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'card-body') {
                    data.bodyContent = renderingEngine.renderElement(child, element);
                } else if (child.name === 'card-footer') {
                    data.footerContent = renderingEngine.renderElement(child, element);
                }
            }
        });

        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.flavour, 'card-', 'card-default');
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();
        data.testMode = Store.isTestContext();

        return renderingEngine.render('card.ftl', data);
    }
}