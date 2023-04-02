export type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  newMessage: (data: NewMessageProps) => void;
};

export type ClientToServerEvents = {};

export type InterServerEvents = {
  ping: () => void;
};

export type SocketData = {};

type NewMessageProps = {
  id: string;
  status: string;
};
