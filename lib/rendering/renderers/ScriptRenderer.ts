import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class ScriptRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'script';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions, parent: Element | undefined): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const data: Record<string, any> = {};

        if (element.attributes.script in substitutions) {
            const val = substitutions[element.attributes.script].value;
            if (typeof val !== "string") {
                throw new RenderError(`Expected string for substitution ${element.attributes.script}`);
            }
            data.text = val;
        } else {
            throw new RenderError(`No substitution found for plantain expression ${element.attributes.script}`);
        }

        return renderingEngine.render('script.ftl', data);
    }
}