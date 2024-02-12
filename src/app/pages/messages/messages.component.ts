import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { CardComponent } from '../../shared/component/card/card.component';
import { MessageItemComponent } from '../../shared/component/message-item/message-item.component';
import { MessageService } from '../../core/services/message.service';
import { Select, Store } from '@ngxs/store';
import { GetAllMessage, MessageState } from '../../store/MessageState';
import { Observable } from 'rxjs';
import { IMessage } from '../../core/models/common.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent,SidebarComponent, MessageItemComponent,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
  @Select(MessageState.selectMessages) messages$!: Observable<IMessage[]>;
  constructor(private messageservice:MessageService,private store:Store){}

  ngOnInit(): void {
   this.getAllMessages();
   
   this.messages$.subscribe({
    next:(value)=>{
      if(!value.length){
        this.store.dispatch(new GetAllMessage())
      }
      console.log(value); 
    }
   })

  }

  getAllMessages(){
    this.messageservice.getAllMessages().subscribe({
      next(value) {
        console.log(value);   
      }
    })
  }

}
