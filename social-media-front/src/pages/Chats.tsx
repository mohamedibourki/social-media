import {
  CheckCheck,
  SearchIcon,
  EllipsisVertical,
  Forward,
  Heart,
  Paperclip,
  Mic,
  CornerDownLeft,
  Phone,
  Video,
  Info,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "../components/ui/chat/chat-bubble";
import { ChatMessageList } from "../components/ui/chat/chat-message-list";
import { ChatInput } from "../components/ui/chat/chat-input";
import { FormEvent, useEffect, useState, useRef } from "react";
import { socketService } from "../services/socket";
import Cookies from "js-cookie";

interface Message {
  id: number;
  message: string;
  sender: "user" | "bot";
  isLoading?: boolean;
  from?: number;
}

export const Chats = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Connect socket when component mounts
    const token = Cookies.get("socketToken");
    if (token) {
      socketService.connect(token);
    }

    // Listen for private messages
    socketService.onPrivateMessage((data) => {
      const newMessage: Message = {
        id: Date.now(),
        message: data.message,
        sender: "bot",
        from: data.from,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    // Listen for typing indicators
    socketService.onTyping(() => setIsTyping(true));
    socketService.onStopTyping(() => setIsTyping(false));

    return () => {
      socketService.disconnect();
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);

    // Handle typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socketService.sendTyping(1); // Replace 1 with actual receiver ID

    typingTimeoutRef.current = setTimeout(() => {
      socketService.sendStopTyping(1); // Replace 1 with actual receiver ID
    }, 1000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add message to local state
    const newMessage: Message = {
      id: Date.now(),
      message: inputMessage,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);

    // Send message through socket
    socketService.sendPrivateMessage(1, inputMessage); // Replace 1 with actual receiver ID

    // Clear input
    setInputMessage("");

    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      socketService.sendStopTyping(1); // Replace 1 with actual receiver ID
    }
  };

  const actionIcons = [
    { icon: EllipsisVertical, type: "ellipsis" },
    { icon: Forward, type: "forward" },
    { icon: Heart, type: "heart" },
  ];

  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col items-center shadow rounded-lg p-4 w-[30%] h-[85vh]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback className="rounded-full">CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">John Doe</h1>
              <p className="text-sm text-gray-500">Info account</p>
            </div>
          </div>
          <SearchIcon />
        </div>
        <br />
        <Tabs defaultValue="all" className="w-full flex flex-col gap-[-10px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
          </TabsList>
          <TabsContent
            value="all"
            className="mt-5 hover:bg-gray-200 rounded-lg hover:rounded-lg transition-colors duration-200 cursor-pointer p-3"
          >
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="John Doe"
                  />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-md font-semibold">Mohamed Ibrahim</h1>
                  <p className="text-xs text-gray-500">
                    You need to accept the request
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="text-xs text-gray-500">12:00 AM</p>
                <div className="flex items-center gap-1">
                  <CheckCheck size={20} color="blue" />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="all"
            className="hover:bg-gray-200 rounded-lg hover:rounded-lg transition-colors duration-200 cursor-pointer p-3"
          >
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="John Doe"
                  />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-md font-semibold">Rachid Alami</h1>
                  <p className="text-xs text-gray-500">
                    You need to accept the request
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="text-xs text-gray-500">12:00 AM</p>
                <div className="flex items-center gap-1">
                  <CheckCheck size={20} color="blue" />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="personal"
            className="hover:bg-gray-200 rounded-lg hover:rounded-lg transition-colors duration-200 cursor-pointer p-3"
          >
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="John Doe"
                  />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-md font-semibold">Rachid Alami</h1>
                  <p className="text-xs text-gray-500">
                    You need to accept the request
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="text-xs text-gray-500">12:00 AM</p>
                <div className="flex items-center gap-1">
                  <CheckCheck size={20} color="blue" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col items-center shadow rounded-lg p-4 w-[70%] h-[85vh]">
        <div className="flex items-center justify-between w-full border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback className="rounded-full">CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">Mohamed Ibrahim</h1>
              <p className="text-sm text-gray-500">Active 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="size-5 cursor-pointer" />
            <Video className="size-5 cursor-pointer" />
            <Info className="size-5 cursor-pointer" />
          </div>
        </div>
        <ChatMessageList ref={messageListRef}>
          {messages.map((message, index) => {
            const variant = message.sender === "user" ? "sent" : "received";
            return (
              <ChatBubble key={message.id} variant={variant}>
                <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} />
                <ChatBubbleMessage
                  isLoading={message.isLoading}
                  className={`rounded-3xl ${
                    variant === "sent" ? "rounded-br-none" : "rounded-bl-none"
                  }`}
                >
                  {message.message}
                </ChatBubbleMessage>
                <ChatBubbleActionWrapper>
                  {actionIcons.map(({ icon: Icon, type }) => (
                    <ChatBubbleAction
                      className="size-7"
                      key={type}
                      icon={<Icon className="size-4" />}
                      onClick={() =>
                        console.log(
                          "Action " + type + " clicked for message " + index
                        )
                      }
                    />
                  ))}
                </ChatBubbleActionWrapper>
              </ChatBubble>
            );
          })}
          {isTyping && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage isLoading={true} />
            </ChatBubble>
          )}
        </ChatMessageList>
        <form
          onSubmit={handleSubmit}
          className="relative w-full rounded-3xl border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="min-h-12 resize-none rounded-3xl bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button type="button" variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>

            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5 rounded-3xl"
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
