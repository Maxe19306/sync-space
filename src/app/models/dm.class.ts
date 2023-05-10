export class DirectMessage {
    members : string[];

    constructor(obj: any){
        this.members = obj && obj.members ? obj.members : [];
    }

    public toJSON() {
        return {
            members: this.members,
        }
    }

}