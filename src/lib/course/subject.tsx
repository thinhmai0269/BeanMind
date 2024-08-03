import axiosClient from "../apiClient";

export function getSubject() {
    return axiosClient.get("/api/v1/subjects");
  }
  export function getSubjectDetail(id: string) {
    return axiosClient.get(`/api/v1/subject/${id}`);
  }