import { isCommandString } from "$lib/helpers";
import type { Message, PartyMember } from "$lib/types";
import type * as Party from "partykit/server";

export default class Server implements Party.Server {

  members: PartyMember[] = [];

  // can access to Party's state within class with 'this.party'
  constructor(readonly party: Party.Party) {
    this.party.getConnections()
  }

  // runs when a connection JOINS the party
  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected: id: ${conn.id} room: ${this.party.id} url: ${new URL(ctx.request.url).pathname}`
    );


    this.members.push({ connectionId: conn.id });
    // let's send a message to the connection

    let message: Message = {
      sender: { connectionId: "server", name: "server" },
      message: "hello from server"
    }
    conn.send(JSON.stringify(message));

    this.party.broadcast(`/member-join:${conn.id}`, [conn.id]);
  }

  // runs when a connection SENDS a message using 'socket.send(msg)'
  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);
    // as well as broadcast it to all the other connections in the room...


    if(isCommandString(message)){
      if(message.includes("/update-name:")){
        this.handleNameUpdate(message, sender);
        return;
      }
    }
    

    let messagex: Message = {
      message: message,
      sender: { connectionId: sender.id }
    }

    this.party.broadcast(JSON.stringify(messagex), [sender.id]);
  }


  onRequest(req: Party.Request): Response | Promise<Response> {
    console.log(`request: ${req.url}`);
    return new Response("hello from server");

  }

  handleNameUpdate(message: string, sender: Party.Connection) {
    let name = message.split(":")[1];
    let member = this.members.find(m => m.connectionId === sender.id);
    if (member) {
      member.name = name;
      console.log(`updated name for ${sender.id} to ${name}`);
      this.party.broadcast(`/name-update:${sender.id}=${name}`)
    }
  }
}

Server satisfies Party.Worker;
