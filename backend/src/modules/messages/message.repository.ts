import { Message } from "../../models/message.js";
import type { MessageData } from "../../types/messages.js";

export const MessagesRepository = {
    createMsg: async (data: MessageData) => {
        const msg = new Message(data);
        return await msg.save();
    }
};


