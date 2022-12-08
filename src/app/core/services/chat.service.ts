import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SocketEvent } from '../constants';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  apiGatewayUrl = environment.apiGatewayUrl;
  currentUser: any;
  chat$ = new BehaviorSubject<any>({});

  constructor(
    private socket: Socket,
    private httpService: HttpService,
    private authService: AuthenticationService
  ) {
    this.currentUser = this.authService.currentUserValue;
    this.socket.ioSocket['auth'] = {
      'access-token': this.currentUser.accessToken,
      'refresh-token': this.currentUser.refreshToken,
    };

    this.socket.on(SocketEvent.ReceiveMessage, (data: any) => {
      this.chat$.next(JSON.parse(data));
    });
  }

  createMessageObservable() {
    return this.chat$.asObservable();
  }

  sendMessage({ content, from, room }: any) {
    this.socket.emit(
      SocketEvent.SendMessage,
      JSON.stringify({
        content,
        from,
        room,
      })
    );
  }

  getMessage(room: any) {
    const getMessageUrl = `${this.apiGatewayUrl}/api/v1/messages`;
    return this.httpService
      .get({
        url: getMessageUrl,
        queryParams: {
          roomId: room._id,
        },
      })
      .pipe(
        map((response) => {
          const dataResponse = response as any;
          return dataResponse && dataResponse.data;
        })
      );
  }

  createChatRoom(roomData: any) {
    const createRoomUrl = `${this.apiGatewayUrl}/api/v1/rooms/${roomData.doctorId}`;
    return this.httpService.post({ url: createRoomUrl, data: roomData }).pipe(
      map((response) => {
        const dataResponse = response as any;
        return dataResponse && dataResponse.data;
      })
    );
  }

  getRooms() {
    const getRoomsUrl = `${this.apiGatewayUrl}/api/v1/rooms`;
    return this.httpService.get({ url: getRoomsUrl }).pipe(
      map((response) => {
        const dataResponse = response as any;
        return dataResponse && dataResponse.data;
      })
    );
  }
}
