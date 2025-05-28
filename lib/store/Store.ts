import User from './User';
import Group from './Group';
import Message from './Message';
import Wizard from './Wizard';
import Workflow from './Workflow';
import Page from './Page';
import Queue from './Queue';
import Kase from "./Kase";


class Store {

    private testContext: boolean = false;

    constructor(
        private users: User[] = [],
        private groups: Group[] = [],
        private messages: Message[] = [],
        private wizards: Wizard[] = [],
        private workflows: Workflow[] = [],
        private pages: Page[] = [],
        private queues: Queue[] = [],
        private kases: Kase[] = [],
    ) {
    }

    public getUsers() {
        return this.users;
    }

    public getGroups() {
        return this.groups;
    }

    public getMessages() {
        return this.messages;
    }

    public getWizards() {
        return this.wizards;
    }

    public getWorkflows() {
        return this.workflows;
    }

    public getPages() {
        return this.pages;
    }

    public getQueues() {
        return this.queues;
    }

    public getKases() {
        return this.kases;
    }

    setTestContext() {
        this.testContext = true;
    }

    isTestContext() {
        return this.testContext;
    }

    clear() {
        this.users = [];
        this.groups = [];
        this.messages = [];
        this.wizards = [];
        this.workflows = [];
        this.pages = [];
        this.kases = [];
        this.testContext = false;
    }

    addUser(user: User) {
        this.users.push(user);
    }

    addMessage(message: Message) {
        this.messages.push(message);
    }

    addWizard(wizard: Wizard) {
        this.wizards.push(wizard);
    }

    addWorkflow(workflow: Workflow) {
        this.workflows.push(workflow);
    }

    addPage(page: Page) {
        this.pages.push(page);
    }

    addQueue(queue: Queue) {
        this.queues.push(queue);
    }

    addGroup(group: Group) {
        this.groups.push(group);
    }

    addKase(kase: Kase) {
        this.kases.push(kase);
    }
}

const INSTANCE = new Store();

export default INSTANCE;

/*
 private final HashMap<DocumentGroupId, PageView> pages = new HashMap<>();
    private final HashMap<DocumentId, Wizard> wizards = new HashMap<>();
    private final HashMap<DocumentGroupId, Workflow> workflows = new HashMap<>();
    private final HashMap<MessageId, Message> messages = new HashMap<>();
    private final HashMap<String, Kase> kases = new HashMap<>();
    private final HashMap<UUID, WizardInProgress> wips = new HashMap<>();
 */