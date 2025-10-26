import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const studentsApi = {
  fetchAll: () => axios.get(`${API_BASE_URL}/students`),
  add: (studentData: any) => axios.post(`${API_BASE_URL}/student`, studentData),
  update: (uuid: number, studentData: any) =>
    axios.put(`${API_BASE_URL}/student/${uuid}`, studentData),
  delete: (uuid: number) => axios.delete(`${API_BASE_URL}/student/${uuid}`),
  fetchById: (uuid: number) => axios.get(`${API_BASE_URL}/student/${uuid}`),
};
