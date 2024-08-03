import axiosClient from "../apiClient";

export function getBill() {
  return axiosClient.get("/bills");
}
