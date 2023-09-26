import type * as Party from "partykit/server";

export default class Server implements Party.Server {

  // can access to Party's state within class with 'this.party'
  constructor(readonly party: Party.Party) { }

  // runs when a connection JOINS the party
  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected: id: ${conn.id} room: ${this.party.id} url: ${new URL(ctx.request.url).pathname}`
    );

    // let's send a message to the connection
    conn.send("hello from server");
  }
  
 // runs when a connection SENDS a message using 'socket.send(msg)'
  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);
    // as well as broadcast it to all the other connections in the room...
    this.party.broadcast(
      `${sender.id}: ${message}`,
      // ...except for the connection it came from
      [sender.id]
    );
  }
}

Server satisfies Party.Worker;
