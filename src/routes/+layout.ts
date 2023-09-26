import { browser, dev } from '$app/environment';
import PartySocket from 'partysocket';
import type { LayoutLoad } from './$types';

export const load = (async () => {

    let clientSocket : PartySocket | undefined;

    if(browser){
        clientSocket = new PartySocket({
            host : dev ? "localhost:1999" : 'some url',
            room: "message-board"
        });
        
    }

    return {
        clientSocket
    };
}) satisfies LayoutLoad;