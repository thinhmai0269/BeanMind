import axiosClient from "../apiClient";
// CHAPTER
export function getChapter() {
  return axiosClient.get("/api/v1/chapters");
}
export function getChapterDetail(id: string) {
  return axiosClient.get(`/api/v1/chapters/${id}`);
}
