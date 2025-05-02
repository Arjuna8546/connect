import axios from "../axiosinterceptor/UserIntreceptor"


export const getchatconversation = (()=> axios.get('chat/conversations/'))

export const createconversation=({participants}) => axios.post("chat/conversations/", participants )

export const specificconversation = (conversationId) => axios.get(
    `chat/conversations/${conversationId}/messages/`
)
