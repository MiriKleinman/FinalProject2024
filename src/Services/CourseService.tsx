import { API } from '../Utils/api';
import axios from 'axios';
import Course from '../interfaces/Course';
import CourseRegistered from '../interfaces/CourseRegistered';
import CourseDto from '../interfaces/CourseDto';
class CourseService {
    getCoursesByTargetAudience = async (communityAdministrationId: string | undefined, targetAudience: string | undefined) => {
        var coursesList: Course[] = [];
        await axios.get(`${API}Course/GetCoursesByTargetAudience/${communityAdministrationId}/${targetAudience}`)
            .then(response => {
                coursesList = response.data;
            })
        return coursesList;
    }
    getCoursesByTargetAudienceMainManager = async (targetAudience: string | undefined, userId: string | undefined, password: string | undefined) => {
        var coursesList: Course[] = [];
        await axios.get(`${API}Course/getCoursesByTargetAudienceMainManager/${targetAudience}/${userId}/${password}`)
            .then(response => {
                coursesList = response.data;
            })
        return coursesList;
    }
    getCourseById = async (courseId: number) => {
        return (await axios.get(`${API}Course/getCourseById/${courseId}`)).data;
    }
    checkNumberOfParticipants = async (courseId: number) => {
        return await axios.get(`${API}Course/checkNumberOfParticipants/${courseId}`)
    }
    addCourseRegistered = async (courseRegitered: CourseRegistered, userId: string) => {
        var res: number = 0;
        await axios.post(`${API}Course/AddCourseRegistered/${userId}`, courseRegitered).then(response => {
            res = response.data;
        })
        return res;
    }
    getCourseRegistereds = async (courseId: number | undefined, userId: string | undefined) => {
        var courseRegisteredsList: CourseRegistered[] = [];
        await axios.get(`${API}Course/getCourseRegisteredsByCourseId/${courseId}/${userId}`)
            .then(response => {
                courseRegisteredsList = response.data;
            })
        return courseRegisteredsList;
    }
    checkForDelete = async (courseId: number, userId: string | undefined) => {
        return (await axios.get(`${API}Course/checkForDelete/${courseId}/${userId}`)).data;
    }
    deleteCourse = async (courseId: number, userId: string | undefined) => {
        return (await axios.delete(`${API}Course/deleteCourse/${courseId}/${userId}`)).data;
    }
    updateCourse = async (courseId: number, userId: string | undefined, course: Course) => {
        return (await axios.put(`${API}Course/UpdateCourse/${courseId}/${userId}`, course)).data;
    }
    addCourse = async (userId: string | undefined, course: Course) => {
        return (await axios.post(`${API}Course/AddCourse/${userId}`, course)).data;
    }
}
export default new CourseService();