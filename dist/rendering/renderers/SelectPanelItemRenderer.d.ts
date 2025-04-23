import { Renderer } from "../Renderer";
import { Element } from "../../xml-parser";
import Properties from "../Properties";
import RenderingEngine from "../RenderingEngine";
import { Substitutions } from "../Substitutions";
export default class SelectPanelItemRenderer implements Renderer {
    accept(name: string): boolean;
    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string;
}
