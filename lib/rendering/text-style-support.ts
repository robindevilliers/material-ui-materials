import Properties from './Properties';
import { StringBuffer } from '../utilities/StringBuffer';
import ClassManager from './ClassManager';

export function textStyleSupport(data: Record<string, any>, classManager: ClassManager, attributes: Record<string, string>, classMappings: Properties) {

    const styles: Record<string, string> = {};

    if (attributes.font) {
        if (attributes.font === 'TITLE_PRIMARY') {
            classManager.add("font-title-primary");
        } else if (attributes.font === 'TITLE_SECONDARY') {
            classManager.add("font-title-secondary");
        } else if (attributes.font === 'TEXT_PRIMARY') {
            classManager.add("font-text-primary");
        } else if (attributes.font === 'TEXT_SECONDARY') {
            classManager.add("font-text-secondary");
        } else if (attributes.font === 'EXHIBIT') {
            classManager.add("font-exhibit");
        } else if (attributes.font === 'PRIMARY') {
            classManager.add("font-primary");
        } else if (attributes.font === 'SECONDARY') {
            classManager.add("font-secondary");
        }
    }

    if (attributes.textAlign) {
        styles['text-align'] = attributes.textAign.toLowerCase();
    }

    if (attributes.fontSize) {
        styles['font-size'] = attributes.fontSize;
    }

    if (attributes.textDecoration) {
        styles['text-decoration'] = attributes.textDecoration.toLowerCase();
    }

    if (attributes.fontStyle) {
        styles['font-style'] = attributes.fontStyle.toLowerCase();
    }

    if (attributes.fontWeight) {
        styles['font-weight'] = attributes.fontWeight.toLowerCase();
    }

    if (attributes.font) {
        styles['font'] = classMappings.get('font-' + attributes.font.toLowerCase().replaceAll("_", "-"));
    }

    if (attributes.fontFlavour) {
        classManager.append(attributes.fontFlavour, 'text-', '');
    }


    if (attributes.backgroundFlavour) {
        classManager.append(attributes.backgroundFlavour, 'bg-', '');
    }

    const buffer = new StringBuffer();
    for (const [key, value] of Object.entries(styles)) {
        buffer.append(`${key}: ${value};`);
    }

    data.textualStyles = buffer.toString();
}