import json

from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import Message, Chat

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        self.chat = await self.get_or_create_chat()
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
  
        sender_name = self.scope['user'].username
        if not sender_name:
            sender_name = 'Anonymous'
        sender_json = json.loads('{"sender": "%s"}' % (sender_name))
        sender = sender_json['sender']
        
        await self.save_message(sender_name, message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))

    @database_sync_to_async
    def get_or_create_chat(self):
        chat, created = Chat.objects.get_or_create(name=self.room_group_name)
        print(chat.name)
        return chat

    @database_sync_to_async
    def save_message(self, username, content):
        user = get_object_or_404(User, username=username)
        msg = Message(user=user, content=content, chat=self.chat)
        msg.save()
        print(msg)