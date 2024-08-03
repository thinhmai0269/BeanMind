import axiosClient from "../apiClient";

export function getParentDetail(id: string) {
    return axiosClient.get(`/api/v1/parents/${id}`);
  }
  export function getParent(id: string) {
    return axiosClient.get(`/api/v1/parents/${id}`);
  }
  
  export function createNewKid(username: string, password: string) {
    return axiosClient.post(`/api/v1/auth/register/`,{
      username: username, 
      password: password,
      roles: ['Parent']
    });
    
  }
  