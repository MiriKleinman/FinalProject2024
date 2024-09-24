import { API } from '../Utils/api';
import axios from 'axios';
import UnitTimeOfPlayingCenter from '../interfaces/UnitTimeOfPlayingCenter';
class PlayingCenterService {
    getPlayingCenter = async (userId: string | undefined) => {
        return (await axios.get(`${API}PlayingCenter/GetPlayingCenter/${userId}`)).data;
    }
    getUnitTimeOfPlayingCenter = async (unitTimeId: number | undefined) => {
        return (await axios.get(`${API}PlayingCenter/GetUnitTimeOfPlayingCenter/${unitTimeId}`)).data;
    }
    updateUnitTimeOfPlayingCenter = async (unitTimeId: number, unitTime: UnitTimeOfPlayingCenter, userId: string | undefined) => {
        return (await axios.put(`${API}PlayingCenter/UpdateUnitTimeOfPlayingCenter/${unitTimeId}/${userId}`, unitTime)).data;
    }
    deleteUnitTimeOfPlayingCenter = async (unitTimeId: number | undefined, userId: string | undefined) => {
        return (await axios.delete(`${API}PlayingCenter/DeleteUnitTimeOfPlayingCenter/${unitTimeId}/${userId}`))
    }
    addUnitTimeOfPlayingCenter = async (unitTime: UnitTimeOfPlayingCenter, userId: string | undefined) => {
        console.log(unitTime, "unitTime service");
        return (await axios.post(`${API}PlayingCenter/AddUnitTimeOfPlayingCenter/${userId}`, unitTime)).data;
    }
    getPlayingCenterId = async (communityAdministrationId: string | undefined) => {
        return (await axios.get(`${API}PlayingCenter/GetPlayingCenterId/${communityAdministrationId}`)).data;
    }
}
export default new PlayingCenterService();