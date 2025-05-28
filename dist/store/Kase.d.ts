export default class Kase {
    private id;
    private dateTime;
    private kaseId;
    private workflowId;
    private principal;
    private timeStamp;
    constructor(id: string, dateTime: string, kaseId: string, workflowId: string, principal: string, timeStamp: number);
    getId(): string;
    getDateTime(): string;
    getKaseId(): string;
    getWorkflowId(): string;
    getPrincipal(): string;
    getTimeStamp(): number;
}
