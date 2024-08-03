import axiosClient from "../apiClient";

// WORKSHEET
export function getWorksheetTemplate() {
  return axiosClient.get("/api/v1/worksheetTemplate");
}
export function getWorksheetTemplateDetail(id: string) {
  return axiosClient.get(`/api/v1/WorksheetTemplate/${id}`);
}
export function getWorksheet() {
  return axiosClient.get("/api/v1/worksheet");
}
export function getWorksheetDetail(id: string) {
  return axiosClient.get(`/api/v1/Worksheet/${id}`);
}
export function getLevelTemlateRelation() {
  return axiosClient.get("/api/v1/LevelTemlateRelation");
}
export function getLevelTemlateRelationDetail(id: string) {
  return axiosClient.get(`/api/v1/LevelTemlateRelation/${id}`);
}
export function getQuestionLevel() {
  return axiosClient.get("/api/v1/worksheet");
}
export function getQuestionLevelDetail(id: string) {
  return axiosClient.get(`/api/v1/QuestionLevel/${id}`);
}
