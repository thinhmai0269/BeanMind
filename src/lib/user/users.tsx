import axiosClient from "../apiClient";

export function getUser() {
  return axiosClient.get("/users");
}
export function getUserDetail(id: string) {
  return axiosClient.get(`/api/v1/auth/info/${id}`);
}
export function testGetUser() {
  return axiosClient.get(`/users`);
}
export function createNewKid(data: any) {
  return axiosClient.post(`/users`, JSON.stringify(data));
}
export function updateChild(data: any, id: string) {
  return axiosClient.post(`/users/${id}`, JSON.stringify(data));
}

export async function changePassword(newPassword: string, userId: string) {
  try {
    // Fetch existing user data
    const response = await axiosClient.get(`/users/${userId}`);
    const userData = response.data;

    if (newPassword === userData.password) {
      return console.log("Same passwrod");
    } else {
      userData.password = newPassword;
    }

    const updateResponse = await axiosClient.put(`/users/${userId}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (updateResponse.status === 200) {
      console.log("Password updated successfully.");
    } else {
      throw new Error("Failed to update password.");
    }
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}
