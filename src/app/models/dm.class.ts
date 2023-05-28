export class DirectMessage {
    members: { name: string, id: string }[];

    constructor(obj: any){
        this.members = obj && obj.members ? obj.members : [];
    }

    public toJSON() {
        return {
            members: this.members,
        }
    }

}