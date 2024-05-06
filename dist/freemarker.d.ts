import { LexicalToken } from './freemarker/template/LexicalToken';
export declare class TemplateEngine {
    private expressionEngine;
    render(template: string, data: Record<string, any>): string;
    private discard;
    private consume;
    private processList;
    private processHash;
    private handleList;
    private handleAssign;
    handleIf(expression: string, row: number, column: number, tokens: LexicalToken[], data: Record<string, any>): [content: string, close: LexicalToken | undefined];
    handleSwitch(expression: string, row: number, column: number, tokens: LexicalToken[], data: Record<string, any>): [content: string, close: LexicalToken | undefined];
}
