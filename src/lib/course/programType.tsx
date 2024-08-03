import axiosClient from "../apiClient";

export function getProgramType() {
    return axiosClient.get("/api/v1/program-types");
  }
  export function getProgramTypeDetail(id: string) {
    return axiosClient.get(`/api/v1/ProgramType/${id}`);
  }
  
  