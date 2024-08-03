import axiosClient from "../apiClient";

export function getStudent() {
  return axiosClient.get(`/api/v1/students/`);
}
export function getStudentDetail(id: string) {
  return axiosClient.get(`/api/v1/students/${id}`);
}
export async function getApplicationUserIdOfStudent(id: string) {
  const res = await axiosClient.get(`/api/v1/students/${id}`);
  return res.data.data.applicationUserId;
}
export function saveStudent(username: string, password: string) {
  return axiosClient.get(`/api/v1/students/`,{
    
  });
}