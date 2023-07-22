export class User {
    Name : string;
    mail: string;
    uid : string;
    lastChannel: string;
    ChannelFromThread: string;
    ThreadID : string;
    openThread: boolean;

    constructor(obj: any){
        this.Name = obj ? obj.firstName : '';
        this.mail = obj ? obj.mail : '';
        this.uid = obj ? obj.uid : '';
        this.lastChannel = obj ? obj.lastChannel : 'NLgyU0FI3CehP4VU7sfR';
        this.ChannelFromThread = obj ? obj.ChannelFromThread : ''
        this.ThreadID = obj ? obj.ThreadID : ''
        this.openThread = false;
    }

    public toJSON() {
        return {
            Name: this.Name,
            mail: this.mail,
            uid: this.uid,
            lastChannel: 'NLgyU0FI3CehP4VU7sfR',
            ChannelFromThread: '',
            openThread: false
        }
    }

}