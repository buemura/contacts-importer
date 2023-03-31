interface MessageProps {
  data: any;
}

export function formatMessage(inputMessage: MessageProps) {
  const message = JSON.stringify(inputMessage);
  return message;
}
