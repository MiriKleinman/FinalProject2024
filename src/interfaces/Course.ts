import CommunityAdministration from "./CommunityAdministration";
import CourseRegistered from "./CourseRegistered";

export default class Course {
    courseId: number = 0;
    communityAdministrationId: string = "";
    courseName: string = "";
    targetAudience: string = "";
    costForLesson: number = 0;
    operatorName: string = "";
    maxParticipants: number = 0;
    remarks: string = "";
    endTimeOfPreview: Date = new Date();
    endTimeOfRegister: Date = new Date();
    day: string = "";
    beginngTime: string = "";
    endTime: string = "";
    countOfRegistereds: number = 0;
    communityAdministration: CommunityAdministration = new CommunityAdministration();
    courseRegistereds: CourseRegistered[] = [];
}





