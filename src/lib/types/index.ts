export type Message = {
    sender: Sender;
    message: string;
}

export type Sender = {
    connectionId: string;
    name?: string;
}