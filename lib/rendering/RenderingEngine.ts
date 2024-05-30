import { Substitutions } from './Substitutions';
import Properties from './Properties';
import { Element, escapeString, isElement, isText } from '../xml-parser';
import generateId from '../utilities/generate-id';
import { findRenderer } from './renderers';
import { FreemarkerError } from '../freemarker/FreemarkerError';
import fs from 'fs';
import path from 'node:path';
import { TemplateEngine } from '../freemarker/TemplateEngine';

import { StringBuffer } from '../utilities/StringBuffer';

export default class RenderingEngine {
    constructor(private classMappings: Properties, private substitutions: Substitutions, private dir: string) {
    }

    renderElement(element: Element, parent?: Element) {

        if (!element.attributes.id) {
            element.attributes.id = generateId();
        }

        const renderer = findRenderer(element.name);
        if (renderer === undefined) {
            throw new FreemarkerError("No binding found for " + element.name);
        }

        return renderer.render(element, this.classMappings, this, this.substitutions, parent);
    }

    renderChildren(element: Element) {
        const content = new StringBuffer();
        element.children.forEach(child => {
            if (isText(child)) {
                content.append(escapeString(child.text));
            } else if (isElement(child)) {
                content.append(this.renderElement(child, element));
            }
        });
        return content.toString();
    }

    render(templateName: string, data: Record<string, any>) {

        const template = fs.readFileSync(path.join(process.env.INIT_CWD!, this.dir, 'partials', templateName), 'utf8');

        try {
            return new TemplateEngine().render(template, data);
        } catch (err) {
            throw new FreemarkerError(`Error processing ftl template '${templateName}'`, err as Error);
        }
    }
}