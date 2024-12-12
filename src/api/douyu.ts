import axios from 'axios';

// getROI 
export function getROI(data: any) {
  return axios.post<any>('/api/calculator/calculate', data);
}
