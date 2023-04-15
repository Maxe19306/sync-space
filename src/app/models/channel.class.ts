export class Channel {
    Name : string;
    description: string;
    members : string[];

    constructor(obj: any){
        this.Name = obj ? obj.Name : '';
        this.description = obj ? obj.description : '';
        this.members = obj && obj.members ? obj.members : [];
    }

    public toJSON() {
        return {
            Name: this.Name,
            description: this.description,
            members: this.members
        }
    }

}