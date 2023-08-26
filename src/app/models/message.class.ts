export class Message {
    text : string;
    creator : string[];
    timestamp: number;
    image: string;
    answer: number

    constructor(obj: any){
        this.text = obj ? obj.text : '';
        this.creator = obj && obj.creator ? obj.creator : [];
        this.timestamp = obj ? obj.founder : [];
        this.image = obj && obj.image ? obj.image : '';
        this.answer = obj && obj.answer ? obj.answer : '';
    }

    public toJSON() {
        return {
            text: this.text,
            creator: this.creator,
            timestamp: this.timestamp,
            image: this.image,
            answer : 0,
        }
    }

}