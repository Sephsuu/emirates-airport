import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: [
          'http://localhost:3000',
          'https://papiverse.vercel.app', 
          'https://x848qg05-3001.asse.devtunnels.ms'
        ],
        methods: ['GET', 'POST'],
        credentials: true,
    },
}) 

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('ChatGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { room: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.room);
    client.to(data.room).emit('userJoined', {
      username: data.username,
      message: `${data.username} joined the room`,
    });
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { room: string; message: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.room).emit('newMessage', {
      username: data.username,
      message: data.message,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { room: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.room);
    client.to(data.room).emit('userLeft', {
      username: data.username,
      message: `${data.username} left the room`,
    });
  }
}