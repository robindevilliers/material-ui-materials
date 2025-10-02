import { StringBuffer } from '../utilities/StringBuffer';
import ClassManager from './ClassManager';
import { Element, isElement } from "../xml-parser";


export function flexContainerSupport(data: Record<string, any>, classManager: ClassManager, element: Element) {

    const styles: Record<string, string> = {
        display: 'flex'
    };

    const bootstrapSizingMode = element.children.find(child => {
        return isElement(child) && (
            child.attributes.columnWidth ||
            child.attributes.columnWidthExtraSmall ||
            child.attributes.columnWidthSmall ||
            child.attributes.columnWidthMedium ||
            child.attributes.columnWidthLarge ||
            child.attributes.columnWidthExtraLarge)
    });

    if (bootstrapSizingMode) {
        classManager.add("row");
    }

    if (element.attributes.padding) {
        styles['padding'] = element.attributes.padding;
    }

    if (element.attributes.orientation) {
        styles['flex-direction'] = element.attributes.orientation.toLowerCase().replaceAll("_", "-");
    }

    if (element.attributes.justifyContent) {
        if (element.attributes.justifyContent === 'START') {
            styles['justify-content'] = 'flex-start';
        } else if (element.attributes.justifyContent === 'END') {
            styles['justify-content'] = 'flex-end';
        } else if (element.attributes.justifyContent === 'CENTER') {
            styles['justify-content'] = 'center';
        } else if (element.attributes.justifyContent === 'SPACE_BETWEEN') {
            styles['justify-content'] = 'space-between';
        } else if (element.attributes.justifyContent === 'SPACE_AROUND') {
            styles['justify-content'] = 'space-around';
        }
    }

    if (element.attributes.alignItems) {
        if (element.attributes.alignItems === 'START') {
            styles['align-items'] = 'flex-start';
        } else if (element.attributes.alignItems === 'END') {
            styles['align-items'] = 'flex-end';
        } else if (element.attributes.alignItems === 'CENTER') {
            styles['align-items'] = 'center';
        } else if (element.attributes.alignItems === 'BASELINE') {
            styles['align-items'] = 'baseline';
        } else if (element.attributes.alignItems === 'STRETCH') {
            styles['align-items'] = 'stretch';
        }
    }

    if (element.attributes.alignContent) {
        if (element.attributes.alignContent === 'START') {
            styles['align-content'] = 'flex-start';
        } else if (element.attributes.alignContent === 'END') {
            styles['align-content'] = 'flex-end';
        } else if (element.attributes.alignContent === 'CENTER') {
            styles['align-content'] = 'center';
        } else if (element.attributes.alignContent === 'BASELINE') {
            styles['align-content'] = 'baseline';
        } else if (element.attributes.alignContent === 'STRETCH') {
            styles['align-content'] = 'stretch';
        }
    }

    if (element.attributes.wrap) {
        styles['flex-wrap'] = element.attributes.wrap.toLowerCase().replaceAll("_", "-");
    }

    const buffer = new StringBuffer();
    for (const [key, value] of Object.entries(styles)) {
        buffer.append(`${key}: ${value};`);
    }

    data.containerStyles = buffer.toString();
}
