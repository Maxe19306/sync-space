export class Channel {
    Name : string;
    description: string;
    members : string[];
    founder: string[];

    constructor(obj: any){
        this.Name = obj ? obj.Name : '';
        this.description = obj ? obj.description : '';
        this.members = obj && obj.members ? obj.members : [];
        this.founder = obj ? obj.founder : [];
    }

    public toJSON() {
        return {
            Name: this.Name,
            description: this.description,
            members: this.members,
            founder: this.founder,
        }
    }

}