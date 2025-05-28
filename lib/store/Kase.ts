export default class Kase {

    constructor(
        private id: string,
        private dateTime: string,
        private kaseId: string,
        private workflowId: string,
        private principal: string,
        private timeStamp: number
    ) {
    }

    public getId() {
        return this.id;
    }

    public getDateTime() {
        return this.dateTime;
    }

    public getKaseId() {
        return this.kaseId;
    }

    public getWorkflowId() {
        return this.workflowId;
    }

    public getPrincipal() {
        return this.principal;
    }

    public getTimeStamp() {
        return this.timeStamp;
    }

}


