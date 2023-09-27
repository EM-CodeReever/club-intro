export type Message = {
    sender: PartyMember;
    message: string;
}

export type PartyMember = {
    connectionId: string;
    name?: string;
}