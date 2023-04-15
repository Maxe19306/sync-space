export class Channel {
    Name : string;
    description: string;

    constructor(obj: any){
        this.Name = obj ? obj.Name : '';
        this.description = obj ? obj.description : '';
    }

    public toJSON() {
        return {
            Name: this.Name,
            description: this.description,
        }
    }

}