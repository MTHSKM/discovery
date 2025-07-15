export type SendMessageToQueueRequest = {
  queue: string;
  message: unknown;
  max_priority?: number;
  priority?: number;
};
