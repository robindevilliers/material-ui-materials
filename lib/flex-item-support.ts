import { StringBuffer } from './utilities/StringBuffer';
import ClassManager from './ClassManager';

export default function flexItemSupport(data: Record<string, any>, classManager: ClassManager, attributes: Record<string, string>) {

    const styles: Record<string, string> = {};

    if (attributes.padding) {
        styles['padding'] = attributes.padding;
    }

    if (attributes.margin) {
        styles['margin'] = attributes.margin;
    }

    if (attributes.flexBasis) {
        styles['flex-basis'] = attributes.flexBasis;
    }

    if (attributes.flexGrow) {
        styles['flex-grow'] = attributes.flexGrow;
    }

    if (attributes.flexShrink) {
        styles['flex-shrink'] = attributes.flexShrink;
    }

    if (attributes.alignSelf) {
        if (attributes.alignSelf === 'START') {
            styles['align-self'] = 'flex-start';
        } else if (attributes.alignSelf === 'END') {
            styles['align-self'] = 'flex-end';
        } else if (attributes.alignSelf === 'CENTER') {
            styles['align-self'] = 'center';
        } else if (attributes.alignSelf === 'BASELINE') {
            styles['align-self'] = 'baseline';
        } else if (attributes.alignSelf === 'STRETCH') {
            styles['align-self'] = 'stretch';
        }
    }

    if (attributes.height) {
        styles['height'] = attributes.height;
    }

    if (attributes.width) {
        styles['width'] = attributes.width;
    }

    if (attributes.borderRadius) {
        styles['border-radius'] = attributes.borderRadius;
    }

    if (attributes.backgroundFlavour) {
        classManager.append(attributes.backgroundFlavour, 'bg-', '');
    }

    const buffer = new StringBuffer();
    for (const [key, value] of Object.entries(styles)) {
        buffer.append(`${key}: ${value};`);
    }

    data.itemStyles = buffer.toString();
}
