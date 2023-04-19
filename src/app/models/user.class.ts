export class User {
    Name : string;
    mail: string;
    uid : string;
    lastChannel: string;

    constructor(obj: any){
        this.Name = obj ? obj.firstName : '';
        this.mail = obj ? obj.mail : '';
        this.uid = obj ? obj.uid : '';
        this.lastChannel = obj ? obj.lastChannel : '';
    }

    public toJSON() {
        return {
            Name: this.Name,
            mail: this.mail,
            uid: this.uid,
            lastChannel: this.lastChannel,
        }
    }

}