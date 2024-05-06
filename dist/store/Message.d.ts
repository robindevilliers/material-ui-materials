export default class Message {
    private id;
    private dateTime;
    private wipId;
    private kaseId;
    private wizardId;
    private workflowId;
    private group;
    private queue;
    private principal;
    private sessionId;
    private timeStamp;
    constructor(id: string, dateTime: string, wipId: string, kaseId: string, wizardId: string, workflowId: string, group: string, queue: string, principal: string, sessionId: string, timeStamp: number);
    getId(): string;
    getDateTime(): string;
    getWipId(): string;
    getKaseId(): string;
    getWizardId(): string;
    getWorkflowId(): string;
    getGroup(): string;
    getQueue(): string;
    getPrincipal(): string;
    getSessionId(): string;
    getTimeStamp(): number;
}
