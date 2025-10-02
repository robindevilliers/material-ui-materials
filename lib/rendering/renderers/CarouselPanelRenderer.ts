import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import { flexContainerSupport } from '../flex-container-support';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';


export default class CarouselPanelRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'carousel-panel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);
        data.active = element.attributes.active === "true";
        data.interval = element.attributes.interval;
        data.src = "/public/img/" + element.attributes.src;
        data.carouselId = parent?.attributes.id;

        const classManager = new ClassManager(classMappings);
        flexContainerSupport(data, classManager, element);
        data.classes = classManager.toString();

        return renderingEngine.render('carousel-panel.ftl', data);
    }
}
