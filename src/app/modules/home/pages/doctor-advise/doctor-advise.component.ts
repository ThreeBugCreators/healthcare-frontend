import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-doctor-advise',
  templateUrl: './doctor-advise.component.html',
  styleUrls: ['./doctor-advise.component.scss'],
})
export class DoctorAdviseComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  rooms: any = [];
  currentRoom: any;
  messages: any = [];
  currentUser: any;
  chatContent = '';
  message$!: Subscription;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.currentUser = this.authService.currentUserValue;
    this.message$ = this.chatService.createMessageObservable().subscribe({
      next: (data) => this.handleIncomingMessage(data),
      error: (error) => console.log(error),
    });
    this.scrollToBottom();
  }

  handleIncomingMessage(message: any) {
    const { content, from, room } = message;

    if (content && room && from) {
      if (this.currentRoom._id === room._id) {
        this.messages.push({
          content,
          from: from._id,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.message$.unsubscribe();
  }

  getRooms() {
    this.chatService.getRooms().subscribe((requestData) => {
      this.rooms = requestData;
      this.currentRoom = this.rooms[0];
      this.getMessages();
    });
  }

  getMessages() {
    this.chatService
      .getMessage(this.currentRoom)
      .subscribe((requestData: any) => {
        this.messages = requestData;
      });
  }

  sendMessage() {
    this.chatService.sendMessage({
      content: this.chatContent,
      from: this.currentUser,
      room: this.currentRoom,
    });
  }

  appendNewMessageToChatBox(message: any) {
    this.messages.push(message);
  }

  triggerFunction(event: any) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.chatContent += '\n';
      console.log('next line!');
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
      this.messages.push({
        from: this.currentUser._id,
        content: this.chatContent,
      });
      this.chatContent = '';
    }
  }
}
