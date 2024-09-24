import { API } from '../Utils/api';
import axios from 'axios';
import UnitTimeOfLibrary from '../interfaces/UnitTimeOfLibrary';
class LibraryService {
    getLibrary = async (communityAdministrationId: string | undefined) => {
        return (await axios.get(`${API}Library/GetLibrary/${communityAdministrationId}`)).data;
    }
    getLibraryId = async (communityAdministrationId: string | undefined) => {
        return (await axios.get(`${API}Library/GetLibraryId/${communityAdministrationId}`)).data;
    }
    getUnitTimeOfLibrary = async (unitTimeId: number) => {
        return (await axios.get(`${API}Library/GetUnitTimeOfLibrary/${unitTimeId}`)).data;
    }
    updateUnitTimeOfLibrary = async (unitTimeId: number, unitTime: UnitTimeOfLibrary, userId: string | undefined) => {
        return (await axios.put(`${API}Library/UpdateUnitTimeOfLibrary/${unitTimeId}/${userId}`, unitTime)).data;
    }
    deleteUnitTimeOfLibrary = async (unitTimeId: number|undefined, userId: string | undefined) => {
        return (await axios.delete(`${API}Library/DeleteUnitTimeOfLibrary/${unitTimeId}/${userId}`))
    }
    addUnitTimeOfLibrary = async (unitTime: UnitTimeOfLibrary, userId: string | undefined) => {
        console.log("service");
        console.log(unitTime, userId);

        return (await axios.post(`${API}Library/AddUnitTimeOfLIbrary/${userId}`, unitTime)).data;
    }

}

export default new LibraryService();