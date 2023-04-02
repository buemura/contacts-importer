export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  newMessage: (data: NewMessageProps) => void;
}

export interface ClientToServerEvents {
  sendMessage: (data: SocketData) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  content: string;
  datetime: Date;
}

interface NewMessageProps {
  id: string;
  status: string;
}
