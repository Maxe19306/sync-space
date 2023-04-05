export class User {
    Name : string;
    mail: string;
    uid : string;

    constructor(obj: any){
        this.Name = obj ? obj.firstName : '';
        this.mail = obj ? obj.mail : '';
        this.uid = obj ? obj.uid : '';
    }

    public toJSON() {
        return {
            Name: this.Name,
            mail: this.mail,
            uid: this.uid,
        }
    }

}