import { API } from '../Utils/api'
import axios from 'axios';
import Message from '../interfaces/Message';
class MessageService {
    addMessage = async (message: Message, userId: string | undefined) => {
        console.log(message, userId, "service----");
        var res: number = 0;
        return (await axios.post(`${API}Message/AddMessage/${userId}`, message)).data;
    }
    // getMessage = async (addresseeId: number, communityAdministrationId: string) => {
    //     console.log(communityAdministrationId);
    //     return (await axios.get(`${API}Message/GetMessageByAdresseeId?courseId=${addresseeId}&communityAdministrationId=${communityAdministrationId}`)).data;
    // }
    getMessageOfCourse = async (addresseeId: number | undefined, communityAdministrationId: string | undefined) => {
        var messages: any;
        await axios.get(`${API}Message/GetMessageByAdresseeId?courseId=${addresseeId}&communityAdministrationId=${communityAdministrationId}`)
            .then(response => {
                messages = response.data;
                console.log(messages, "messages from service");
            })
        return messages;
    }
    getMessageOfActivity = async (addresseeId: number | undefined, communityAdministrationId: string | undefined) => {
        var messages: any;
        await axios.get(`${API}Message/GetMessageByAdresseeId?activityId=${addresseeId}&communityAdministrationId=${communityAdministrationId}`)
            .then(response => {
                messages = response.data;
                console.log(messages, "messages from service");
            })
        return messages;
    }
}
export default new MessageService();