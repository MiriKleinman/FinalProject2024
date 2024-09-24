import { API } from '../Utils/api'
import axios from 'axios';
import CommunityAdministration from '../interfaces/CommunityAdministration';
import NewCommunityAdministration from '../interfaces/CommunityAdministrationDto';
import CommunityAdministrationDto from '../interfaces/CommunityAdministrationDto';
class CommunityAdministrationsService {
    GetNamesListOfCommunityAdministration = async () => {
        return (await axios.get(`${API}CommunityAdministration/GetNamesListOfCommunityAdministration`)).data;
    }
    getCommunityAdministratinById = async (communityAdministrationId: string | undefined) => {
        return (await axios.get(`${API}CommunityAdministration/GetCommunityAdministrationById/${communityAdministrationId}`)).data;
    }
    getCommunityAdministrations = async (managerId: string | undefined, managerPassword: string | undefined) => {
        return (await axios.get(`${API}CommunityAdministration/GetCommunityAdministrations/${managerId}/${managerPassword}`)).data;
    }
    updateCommunityAdministration = async (communityAdministration: CommunityAdministration, communityAdministrationId: string | undefined, userId: string | undefined, password: string | undefined) => {
        debugger
        console.log(communityAdministration);
        return (await axios.put(`${API}CommunityAdministration/UpdateCommunityAdministration/${userId}/${password}/${communityAdministrationId}`, communityAdministration)).data
    }
    addCommunityAdministration = async (newCommunityAdministration: CommunityAdministrationDto, userId: string | undefined, password: string | undefined) => {
        console.log(newCommunityAdministration, "newCommunityAdministration");
        return (await axios.post(`${API}CommunityAdministration/AddCommunityAdministration/${userId}/${password}`, newCommunityAdministration)).data;
    }
}
export default new CommunityAdministrationsService();