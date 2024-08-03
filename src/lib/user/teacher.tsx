import axiosClient from "../apiClient";

export function getTeacherDetail(id: string) {
    return axiosClient.get(`/api/v1/auth/info/${id}`);
  }export function getAllTeacher() {
    return axiosClient.get(`/api/v1/teachers/`);
  }