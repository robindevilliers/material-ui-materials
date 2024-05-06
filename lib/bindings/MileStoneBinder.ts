import { Renderer } from '../Renderer';
import { Element, isElement } from '../parser';
import Properties from '../properties';

import ClassManager from '../ClassManager';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';


export default class MileStoneBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'mile-stone';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        const stones = parent!.children
            .filter(el => isElement(el))
            .map(el => el as Element)
            .filter(el => el.name = "mile-stone");

        const total = stones.length;
        const index = stones.findIndex(el => el === element);

        let tag = "";
        if (parent!.attributes.mileStoneStyle === "NUMBERED") {
            tag = "" + (index + 1);
        } else if (parent!.attributes.mileStoneStyle === "PERCENT") {
            tag = "" + Math.floor(index / total * 100) + "%";
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.label = element.attributes.label;
        data.active = element.attributes.active === "true";
        data.mileStoneStyle = parent!.attributes.mileStoneStyle;
        data.labelSide = parent!.attributes.labelSide;
        data.content = renderingEngine.renderChildren(element);
        data.tag = tag;


        const classManager = new ClassManager(classMappings);
        classManager.append(element.attributes.mileStoneStyle, 'milestone-style-', '');
        classManager.append(element.attributes.labelSide, 'label-side-', '');
        data.classes = classManager.toString();

        return renderingEngine.render('mile-stone.ftl', data);
    }
}