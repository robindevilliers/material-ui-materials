import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';

import { flexContainerSupport } from '../flex-container-support';
import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';


export default class CarouselPanelBinder implements Renderer {
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
        data.imageClasses = classMappings.get("carousel-image");

        const classManager = new ClassManager(classMappings);
        flexContainerSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('carousel-panel.ftl', data);
    }
}
