import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const mockChats = [
  {
    id: '1',
    name: 'Stefan M.',
    lastMessage: 'Отличный вариант! Когда можем встретиться?',
    time: '14:32',
    unread: 2,
    avatar: 'S',
    item: 'Велосипед Trek',
    online: true,
  },
  {
    id: '2',
    name: 'Emma L.',
    lastMessage: 'Книги ещё доступны?',
    time: '12:15',
    unread: 0,
    avatar: 'E',
    item: 'Учебники Python',
    online: false,
  },
  {
    id: '3',
    name: 'Pierre D.',
    lastMessage: 'Договорились, пишите адрес',
    time: 'Вчера',
    unread: 0,
    avatar: 'P',
    item: 'PlayStation 5',
    online: false,
  },
  {
    id: '4',
    name: 'Yuki T.',
    lastMessage: 'Фото отправил на почту',
    time: 'Вчера',
    unread: 1,
    avatar: 'Y',
    item: 'Canon EOS R6',
    online: true,
  },
];

const mockMessages = [
  { id: '1', from: 'them', text: 'Привет! Ваш велосипед ещё доступен для обмена?', time: '14:10' },
  { id: '2', from: 'me', text: 'Да, конечно! Что предлагаете взамен?', time: '14:15' },
  { id: '3', from: 'them', text: 'У меня есть электросамокат Xiaomi в отличном состоянии, почти новый. Как вам такой обмен?', time: '14:20' },
  { id: '4', from: 'me', text: 'Звучит интересно! Можете показать фото?', time: '14:25' },
  { id: '5', from: 'them', text: 'Отличный вариант! Когда можем встретиться?', time: '14:32' },
];

const Messages = () => {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setNewMessage('');
  };

  return (
    <Layout hideFooter>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Сообщения
        </h1>

        <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
          <div className="flex h-full">
            <div className="w-full sm:w-80 border-r border-border/40 flex flex-col">
              <div className="p-3 border-b border-border/40">
                <div className="relative">
                  <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Поиск чатов" className="pl-9 h-9 rounded-xl text-sm" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {mockChats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`w-full flex items-center gap-3 p-3 text-left hover:bg-muted/40 transition-colors
                      ${activeChat.id === chat.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-1">{chat.time}</span>
                      </div>
                      <p className="text-xs text-primary/70 truncate mb-0.5">{chat.item}</p>
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden sm:flex flex-1 flex-col">
              <div className="flex items-center gap-3 p-4 border-b border-border/40">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                  {activeChat.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{activeChat.name}</p>
                  <p className="text-xs text-muted-foreground">по объявлению: {activeChat.item}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground">
                    <Icon name="Phone" size={17} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground">
                    <Icon name="MoreVertical" size={17} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mockMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                        ${msg.from === 'me'
                          ? 'gradient-bg text-white rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                        }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-white/60 text-right' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="p-3 border-t border-border/40 flex gap-2">
                <button type="button" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex-shrink-0">
                  <Icon name="Paperclip" size={18} />
                </button>
                <Input
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Написать сообщение..."
                  className="rounded-xl flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="gradient-bg text-white border-0 hover:opacity-90 flex-shrink-0 rounded-xl w-10 h-10"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
