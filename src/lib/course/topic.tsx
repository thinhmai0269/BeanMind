import axiosClient from "../apiClient";

export function getSubject() {
    return axiosClient.get("/api/v1/topic");
  }
  export function getSubjectDetail(id: string) {
    return axiosClient.get(`/api/v1/topic/${id}`);
  }