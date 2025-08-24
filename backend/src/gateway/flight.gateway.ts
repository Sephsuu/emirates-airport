import { forwardRef, Inject } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { FlightService } from "src/entities/flights/flight.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})

export class FlightGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        @Inject(forwardRef(() => FlightService))
        private readonly flightService: FlightService
    ) {}

    async handleConnection(client: Socket) {
        const flights = await this.flightService.getAllFlights();
        client.emit('flights', flights);
    }

    async broadcastFlights() {
        const flights = await this.flightService.getAllFlights();
        this.server.emit('flights', flights);
    }
}