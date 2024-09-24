import { API } from '../Utils/api';
import axios from 'axios';
import Activity from '../interfaces/Activity';
import ParticipantInActivity from '../interfaces/ParticipantInActivity';
class ActivityService {
    getActivities = async (communityAdministrationId: string | undefined, targetAudience: string | undefined) => {
        debugger
        var activityList: Activity[] = [];
        await axios.get(`${API}Activity/GetActivities/${communityAdministrationId}`)
            .then(response => {
                activityList = response.data;
                console.log(activityList);
            })
        return activityList.filter((activity: Activity) => activity.targetAudience === targetAudience);
    }
    getActivityById = async (activityId: number) => {
        return (await axios.get(`${API}Activity/GetActivityById/${activityId}`)).data;
    }
    checkNumberOfParticipants = async (activityId: number) => {
        return await axios.get(`${API}Activity/checkNumberOfParticipants/${activityId}`)
    }
    addParticipantToActivity = async (participantInActivity: ParticipantInActivity, userId: string) => {
        var res: number = 0;
        await axios.post(`${API}Activity/AddParticipantToActivity/${userId}`, participantInActivity).then(response => {
            res = response.data;
            console.log(res, "addParticipantToActivity ActivityService");
        })
        return res;
    }
    editActivity = async (activityId: number, userId: string | undefined, activity: Activity) => {
        debugger
        return (await axios.put(`${API}Activity/UpdateActivity/${activityId}/${userId}`, activity)).data;
    }
    checkForDelete = async (activityId: number, userId: string | undefined) => {
        return (await axios.get(`${API}Activity/checkForDelete/${activityId}/${userId}`)).data;
    }
    deleteActivity = async (activityId: number, userId: string | undefined) => {
        return (await axios.delete(`${API}Activity/DeleteActivity/${activityId}/${userId}`)).data;
    }
    addActivity = async (userId: string | undefined, activity: Activity) => {
        debugger
        console.log(activity, "activity from service");
        return (await axios.post(`${API}Activity/AddActivity/${userId}`, activity)).data;
    }
    getParticipantInActivity = async (activityId: number | undefined, userId: string | undefined) => {
        return (await axios.get(`${API}Activity/GetParticipantInActivities/${activityId}/${userId}`)).data

    }
}
export default new ActivityService();