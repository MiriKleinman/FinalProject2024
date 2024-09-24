import { API } from '../Utils/api';
import axios from 'axios';
import User from '../interfaces/User';
class UserService {
    updateUser = async (userId: string, password: string, user: User) => {
        return (await (axios.put(`${API}User/updateUser/${userId}/${password}`, user))).data;
    }

    getUsersByCommunityAdministrationId = async (communityAdministrationId: string | undefined) => {
        return (await (axios.get(`${API}User/GetUsersByCommunityAdministrationId/${communityAdministrationId}`))).data;
    }

    addUser = async (userId: string | undefined, password: string | undefined, user: User) => {
        return (await axios.post(`${API}User/AddUser/${userId}/${password}`, user)).data;
    }
}
export default new UserService();