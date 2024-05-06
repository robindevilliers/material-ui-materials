import { Renderer } from '../Renderer';
import { Element } from '../parser';
import Properties from '../properties';
import RenderingEngine from '../RenderingEngine';
export default class FakePageBinder implements Renderer {
    accept(name: string): boolean;
    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string;
}
