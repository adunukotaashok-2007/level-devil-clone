import { WebSocketServer } from "ws";
import { randomUUID } from "crypto";

const PORT =
  process.env.PORT || 8080;

const server =
  new WebSocketServer({
    port: PORT
  });

const players = {};

console.log(
  `Trap Runner multiplayer server running on port ${PORT}`
);

server.on(
  "connection",
  (socket) => {

    const id =
      randomUUID();

    players[id] = {
      id: id,
      x: 100,
      y: 400,
      velocityX: 0,
      velocityY: 0,
      level: 1
    };

    // Tell the new player their ID
    socket.send(
      JSON.stringify({
        type: "welcome",
        id: id
      })
    );

    // Send current players
    socket.send(
      JSON.stringify({
        type: "players",
        players: players
      })
    );

    // Tell everyone about the new player
    broadcast({
      type: "playerJoined",
      player: players[id]
    });

    socket.on(
      "message",
      (message) => {

        try {

          const data =
            JSON.parse(
              message.toString()
            );

          if (
            data.type === "join"
          ) {

            if (players[id]) {
              players[id].level =
                data.level || 1;
            }

            broadcastPlayers();

            return;
          }

          if (
            data.type ===
            "playerMove"
          ) {

            if (!players[id]) {
              return;
            }

            players[id].x =
              Number(data.x) || 100;

            players[id].y =
              Number(data.y) || 400;

            players[id].velocityX =
              Number(
                data.velocityX
              ) || 0;

            players[id].velocityY =
              Number(
                data.velocityY
              ) || 0;

            players[id].level =
              Number(data.level) || 1;

            broadcastPlayers();
          }

        } catch (error) {

          console.error(
            "Invalid message:",
            error
          );
        }
      }
    );

    socket.on(
      "close",
      () => {

        delete players[id];

        broadcast({
          type: "playerLeft",
          id: id
        });

        broadcastPlayers();
      }
    );

    socket.on(
      "error",
      (error) => {

        console.error(
          "WebSocket error:",
          error
        );
      }
    );
  }
);

function broadcastPlayers() {

  broadcast({
    type: "players",
    players: players
  });
}

function broadcast(data) {

  const message =
    JSON.stringify(data);

  server.clients.forEach(
    (client) => {

      if (
        client.readyState === 1
      ) {

        client.send(message);
      }
    }
  );
}
