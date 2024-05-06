import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import flexItemSupport from '../flex-item-support';
import { Errors } from '../Errors';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';

export default class ErrorSummaryBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'error-summary';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.errors = new Errors();

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('error-summary.ftl', data);
    }
}
