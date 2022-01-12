interface IMessage { tag: string; message: string; error?: any; status?: any }
export const logger = (messageObject: IMessage) => console.log(messageObject);
