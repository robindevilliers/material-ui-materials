import { StringBuffer } from './utilities/StringBuffer';
import ClassManager from './ClassManager';


export function flexContainerSupport(data: Record<string, any>, classManager: ClassManager, attributes: Record<string, string>) {

    const styles: Record<string, string> = {
        display: 'flex'
    };

    if (attributes.padding) {
        styles['padding'] = attributes.padding;
    }

    if (attributes.orientation) {
        styles['flex-direction'] = attributes.orientation.toLowerCase().replaceAll("_", "-");
    }

    if (attributes.justifyContent) {
        if (attributes.justifyContent === 'START') {
            styles['justify-content'] = 'flex-start';
        } else if (attributes.justifyContent === 'END') {
            styles['justify-content'] = 'flex-end';
        } else if (attributes.justifyContent === 'CENTER') {
            styles['justify-content'] = 'center';
        } else if (attributes.justifyContent === 'SPACE_BETWEEN') {
            styles['justify-content'] = 'space-between';
        } else if (attributes.justifyContent === 'SPACE_AROUND') {
            styles['justify-content'] = 'space-around';
        }
    }

    if (attributes.alignItems) {
        if (attributes.alignItems === 'START') {
            styles['align-items'] = 'flex-start';
        } else if (attributes.alignItems === 'END') {
            styles['align-items'] = 'flex-end';
        } else if (attributes.alignItems === 'CENTER') {
            styles['align-items'] = 'center';
        } else if (attributes.alignItems === 'BASELINE') {
            styles['align-items'] = 'baseline';
        } else if (attributes.alignItems === 'STRETCH') {
            styles['align-items'] = 'stretch';
        }
    }

    if (attributes.alignContent) {
        if (attributes.alignContent === 'START') {
            styles['align-content'] = 'flex-start';
        } else if (attributes.alignContent === 'END') {
            styles['align-content'] = 'flex-end';
        } else if (attributes.alignContent === 'CENTER') {
            styles['align-content'] = 'center';
        } else if (attributes.alignContent === 'BASELINE') {
            styles['align-content'] = 'baseline';
        } else if (attributes.alignContent === 'STRETCH') {
            styles['align-content'] = 'stretch';
        }
    }

    if (attributes.wrap) {
        styles['flex-wrap'] = attributes.wrap.toLowerCase().replaceAll("_", "-");
    }

    const buffer = new StringBuffer();
    for (const [key, value] of Object.entries(styles)) {
        buffer.append(`${key}: ${value};`);
    }

    data.containerStyles = buffer.toString();
}
