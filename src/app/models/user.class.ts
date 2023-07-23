export class User {
    name : string;
    mail: string;
    uid : string;
    lastChannel: string;
    channelFromThread: string;
    threadId : string;
    openThread: boolean;

    constructor(obj: any){
        this.name = obj ? obj.firstName : '';
        this.mail = obj ? obj.mail : '';
        this.uid = obj ? obj.uid : '';
        this.lastChannel = obj ? obj.lastChannel : 'VOYDpVDTzMITDQoMXGhb';
        this.channelFromThread = obj ? obj.channelFromThread : ''
        this.threadId = obj ? obj.threadId : ''
        this.openThread = false;
    }

    public toJSON() {
        return {
            name: this.name,
            mail: this.mail,
            uid: this.uid,
            lastChannel: 'VOYDpVDTzMITDQoMXGhb',
            channelFromThread: '',
            openThread: false
        }
    }

}