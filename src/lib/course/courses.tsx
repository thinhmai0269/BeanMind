import axiosClient from "../apiClient";
// COURSE
export function getCourse() {
  return axiosClient.get("/api/v1/courses");
}
export function getCourseDetail(id: string) {
  return axiosClient.get(`/api/v1/courses/${id}`);
}
export function getCourseLevel() {
  return axiosClient.get("/api/v1/course-levels");
}
export function getCourseLevelDetail(id: string) {
  return axiosClient.get(`/api/v1/CourseLevel/${id}`);
}
