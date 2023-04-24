export class Message {
    text : string;
    creator : string[];
    timestamp: number;

    constructor(obj: any){
        this.text = obj ? obj.text : '';
        this.creator = obj && obj.creator ? obj.creator : [];
        this.timestamp = obj ? obj.founder : [];
    }

    public toJSON() {
        return {
            text: this.text,
            creator: this.creator,
            timestamp: this.timestamp,
        }
    }

}