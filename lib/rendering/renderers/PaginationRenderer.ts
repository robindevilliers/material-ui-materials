import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import { Substitutions } from '../Substitutions';
import RenderingEngine from '../RenderingEngine';
import { StringBuffer } from '../../utilities/StringBuffer';
import { RenderError } from '../RenderError';
import generateId from "../../utilities/generate-id";

export default class PaginationRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'pagination';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine, substitutions: Substitutions): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        const output = new StringBuffer();

        if (element.attributes.reference in substitutions) {

            output.append(renderingEngine.renderChildren(element));
        } else {
            throw new RenderError(`No substitution found for plantain expression ${element.attributes.reference}`);
        }

        let bust = generateId();
        return renderingEngine.render('pagination.ftl', {
            id: generateId(),
            _csrf: generateId(),
            bust: bust,
            action: '#' + bust,
            content: output.toString(),
            noContent: true,
            pageSize: 20,
            currentPage: 2,
            previousPage: 1,
            nextPage: 3,
            offeredPages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        });
    }
}