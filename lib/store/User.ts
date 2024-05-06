export default class User {

    constructor(
        private username: string,
        private title: string,
        private firstName: string,
        private lastName: string,
        private email: string,
        private contactNumber: string,
        private dateOfBirth: string,
        private timezone: string,
        private groups: string[],
        private userData: any
    ) {
    }

    public getUsername() {
        return this.username;
    }

    public getTitle() {
        return this.title;
    }

    public getFirstName() {
        return this.firstName;
    }

    public getLastName() {
        return this.lastName;
    }

    public getEmail() {
        return this.email;
    }

    public getContactNumber() {
        return this.contactNumber;
    }

    public getDateOfBirth() {
        return this.dateOfBirth;
    }

    public getTimezone() {
        return this.timezone;
    }

    public getGroups() {
        return this.groups;
    }

    public getUserData() {
        return this.username;
    }
}

