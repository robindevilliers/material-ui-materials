import { StringBuffer } from '../utilities/StringBuffer';
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

    if (attributes.columnWidth) {
        classManager.append(attributes.columnWidth, 'col-', '');
    }

    if (attributes.columnWidthExtraSmall) {
        classManager.append(attributes.columnWidthExtraSmall, 'col-xs-', '');
    }

    if (attributes.columnWidthSmall) {
        classManager.append(attributes.columnWidthSmall, 'col-sm-', '');
    }

    if (attributes.columnWidthMedium) {
        classManager.append(attributes.columnWidthMedium, 'col-md-', '');
    }

    if (attributes.columnWidthLarge) {
        classManager.append(attributes.columnWidthLarge, 'col-lg-', '');
    }

    if (attributes.columnWidthExtraLarge) {
        classManager.append(attributes.columnWidthExtraLarge, 'col-xl-', '');
    }

    if (attributes.offsetColumnWidth) {
        classManager.append(attributes.offsetColumnWidth, 'offset-', '');
    }

    if (attributes.offsetColumnWidthExtraSmall) {
        classManager.append(attributes.offsetColumnWidthExtraSmall, 'offset-xs-', '');
    }

    if (attributes.offsetColumnWidthSmall) {
        classManager.append(attributes.offsetColumnWidthSmall, 'offset-sm-', '');
    }

    if (attributes.offsetColumnWidthMedium) {
        classManager.append(attributes.offsetColumnWidthMedium, 'offset-md-', '');
    }

    if (attributes.offsetColumnWidthLarge) {
        classManager.append(attributes.offsetColumnWidthLarge, 'offset-lg-', '');
    }

    if (attributes.offsetColumnWidthExtraLarge) {
        classManager.append(attributes.offsetColumnWidthExtraLarge, 'offset-xl-', '');
    }

    if (attributes.hideColumn === 'true') {
        classManager.add('hide-column');
    }

    if (attributes.hideColumnExtraSmall === 'true') {
        classManager.add('hide-xs-column');
    }

    if (attributes.hideColumnSmall === 'true') {
        classManager.add('hide-sm-column');
    }

    if (attributes.hideColumnMedium === 'true') {
        classManager.add('hide-md-column');
    }

    if (attributes.hideColumnLarge === 'true') {
        classManager.add('hide-lg-column');
    }

    if (attributes.hideColumnExtraLarge === 'true') {
        classManager.add('hide-xl-column');
    }

    const buffer = new StringBuffer();
    for (const [key, value] of Object.entries(styles)) {
        buffer.append(`${key}: ${value};`);
    }

    data.itemStyles = buffer.toString();
}
