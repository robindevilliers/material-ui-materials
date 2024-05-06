export default class User {
    private username;
    private title;
    private firstName;
    private lastName;
    private email;
    private contactNumber;
    private dateOfBirth;
    private timezone;
    private groups;
    private userData;
    constructor(username: string, title: string, firstName: string, lastName: string, email: string, contactNumber: string, dateOfBirth: string, timezone: string, groups: string[], userData: any);
    getUsername(): string;
    getTitle(): string;
    getFirstName(): string;
    getLastName(): string;
    getEmail(): string;
    getContactNumber(): string;
    getDateOfBirth(): string;
    getTimezone(): string;
    getGroups(): string[];
    getUserData(): string;
}
