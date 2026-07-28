import type { MessageData } from "../../types/messages.js";
import { MessagesRepository } from "./message.repository.js";


export const MessagesService = {
    createMsg: async (data: MessageData) => {
        const msg = await MessagesRepository.createMsg(data);
        return msg;
    }
}