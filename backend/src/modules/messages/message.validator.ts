import { z } from "zod";


export const createMessageSchema = z.object({
    name: z.string().trim().min(5, "Provide valid name."),
    email: z.string().email("Provide a valid email."),
    content: z.string().trim().min(1, "Message content cannot be empty.")
});