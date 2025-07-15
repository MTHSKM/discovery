import { MessageContent } from '@langchain/core/messages';

export type AIOutputType = {
  id: string;
  message: MessageContent;
};
