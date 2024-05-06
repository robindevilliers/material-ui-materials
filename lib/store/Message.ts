export default class Message {

    constructor(
        private id: string,
        private dateTime: string,
        private wipId: string,
        private kaseId: string,
        private wizardId: string,
        private workflowId: string,
        private group: string,
        private queue: string,
        private principal: string,
        private sessionId: string,
        private timeStamp: number
    ) {
    }

    public getId() {
        return this.id;
    }

    public getDateTime() {
        return this.dateTime;
    }

    public getWipId() {
        return this.wipId;
    }

    public getKaseId() {
        return this.kaseId;
    }

    public getWizardId() {
        return this.wizardId;
    }

    public getWorkflowId() {
        return this.workflowId;
    }

    public getGroup() {
        return this.group;
    }

    public getQueue() {
        return this.queue;
    }

    public getPrincipal() {
        return this.principal;
    }

    public getSessionId() {
        return this.sessionId;
    }

    public getTimeStamp() {
        return this.timeStamp;
    }

}


