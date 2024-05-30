import { Renderer } from '../Renderer';
import { Element } from '../../xml-parser';
import Properties from '../Properties';
import flexItemSupport from '../flex-item-support';
import ClassManager from '../ClassManager';
import RenderingEngine from '../RenderingEngine';
import { RenderError } from '../RenderError';

export default class ScaleRenderer implements Renderer {
    accept(name: string): boolean {
        return name === 'scale';
    }

    render(element: Element, classMappings: Properties, renderingEngine: RenderingEngine): string {

        if (!element.attributes.v) {
            throw new RenderError("Version attribute 'v' not configured against element: " + element.name);
        }

        let values = undefined;
        if (element.attributes.scaleType === 'NUMERICAL') {
            values = [
                { key: "1", label: "1" },
                { key: "2", label: "2" },
                { key: "3", label: "3" },
                { key: "4", label: "4" },
                { key: "5", label: "5" },
                { key: "6", label: "6" },
                { key: "7", label: "7" },
                { key: "8", label: "8" },
                { key: "9", label: "9" },
                { key: "10", label: "10" },
            ];
        } else if (element.attributes.scaleType === 'LIKERT') {
            values = [
                { key: "strongly-disagree", label: "Strongly Disagree" },
                { key: "disagree", label: "Disagree" },
                { key: "neutral", label: "Neutral" },
                { key: "agree", label: "Agree" },
                { key: "strongly-agree", label: "Strongly Agree" },
            ];
        } else if (element.attributes.scaleType === 'FREQUENCY') {
            values = [
                { key: "never", label: "Never" },
                { key: "rarely", label: "Rarely" },
                { key: "sometimes", label: "Sometimes" },
                { key: "often", label: "Often" },
                { key: "very-often", label: "Very Often" },
            ];
        } else if (element.attributes.scaleType === 'DICHOTOMOUS') {
            values = [
                { key: "yes", label: "Yes" },
                { key: "no", label: "No" }
            ];
        } else if (element.attributes.scaleType === 'BOOLEAN') {
            values = [
                { key: "true", label: "True" },
                { key: "false", label: "False" }
            ];
        }

        const data: Record<string, any> = {};
        data.id = element.attributes.id;
        data.disabled = null;
        data.label = element.attributes.label;
        data.scaleType = element.attributes.scaleType;
        data.name = element.attributes.reference;
        data.size = element.attributes.size;
        data.values = values;
        data.value = "";
        data.error = "Scale error message";

        const classManager = new ClassManager(classMappings);
        flexItemSupport(data, classManager, element.attributes);
        data.classes = classManager.toString();

        return renderingEngine.render('scale.ftl', data);
    }
}
