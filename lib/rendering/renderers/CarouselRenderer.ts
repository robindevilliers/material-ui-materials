import { Renderer } from '../Renderer';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { Element, isElement } from '../../xml-parser';

export default class CarouselRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'carousel';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        const panels = element.children.filter(el => isElement(el))
            .map(el => el as Element)
            .filter(el => el.name === 'carousel-panel');

        let activeIndex = panels.findIndex(el => el.attributes.active === "true");

        if (activeIndex === -1 && panels.length) {
            panels[0].attributes.active = "true";
            activeIndex = 0;
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.content = renderingEngine.renderChildren(element);
        data.autoSlide = element.attributes.autoSlide === "true";
        data.controls = element.attributes.controls === "true";
        data.indicators = element.attributes.indicators === "true";
        data.numberOfIndicators = panels.length;
        data.activeIndex = activeIndex || 0;

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('carousel.ftl', data);
    }
}