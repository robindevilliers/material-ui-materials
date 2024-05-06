import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';

export default class HorizontalRuleBinder implements Renderer {
    accept(name: string): boolean {
        return name === 'horizontal-rule';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        return renderingEngine.render('horizontal-rule.ftl', {});
    }
}
