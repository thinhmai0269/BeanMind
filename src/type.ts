interface User {
  userName: string;
  lastName?: string;
  id?: string;
  firstName?: string;
  yearOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  emailConfirmed?: boolean;
  roles?: string;
}
interface Teacher extends User {
  teacher: any;
  applicationUserId?: string;
  experience?: string;
  image?: string;
  level?: string;
  id: string;
  isDeleted?: boolean;
}
interface Parent extends User {
  applicationUserId?: string;
  address: string;
  phone: string;
  wallet: string;
  id: string;
  isDeleted?: boolean;
  gender?: boolean;
  applicationUser?: any
  student?: any;
}
interface Student extends User {
  applicationUser: {
    userName: string;
    lastName: string;
    firstName: string;
    email: string;
    id: string;
  };
  applicationUserId: string;
  image?: string;
  school?: string;
  class?: string;
  isDeleted?: boolean;
}
interface Subject {
  id: string;
  title: string;
  description: string;
  isDeleted: boolean;
}
interface Course {
  id: string;
  imageURL?: string;
  title: string;
  description: string;
  totalSlot: number;
  subjectId: string;
  programTypeId: string;
  courseLevelId: string;
  isDeleted: boolean;
  price: number;
}
interface CourseLevel extends Course {
  id: string;
  title: string;
  description: string;
  isDeleted: boolean;
}
interface ProgramType extends Course {
  id: string;
  title: string;
  description: string;
  isDeleted: boolean;
}
interface enrollments {
  applicationUserId: string;
  courseId: string;
  status: true;
  id: string;
  isDeleted: boolean;
}
interface teachables {
  applicationUserId: string;
  courseId: string;
  id: string;
  isDeleted: boolean;
  status: boolean;
}
interface Chapter {
  id: string;
  title: string;
  description: string;
  courseId: string;
  isDeleted: boolean;
}
interface WorksheetTemplete {
  // item:Array;
  pageIndex: number;
  pageSize: number;
  totalPage: number;
}
interface UpdateLevelTemplateRelationCommand extends WorksheetTemplete {
  id: string;
  questionLevelId: string;
  worksheetTemplateId: string;
  questionCount: number;
}
interface Topic {
  id: string;
  title: string;
  description: string;
  chapterId: string;
  isDeleted: boolean;
}
