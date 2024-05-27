import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import RenderingEngine from '../RenderingEngine';

export default class HorizontalRuleRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'horizontal-rule';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {
        return renderingEngine.render('horizontal-rule.ftl', {});
    }
}
