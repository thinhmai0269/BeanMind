import axiosClient from "../apiClient";

export function getCourseEnrollmentByStudentId(id: string) {
    return axiosClient.get(`/api/v1/enrollments/${id}`);
  }