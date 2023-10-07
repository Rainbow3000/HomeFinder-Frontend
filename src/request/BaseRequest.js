import { userRequest } from "@/instanceAxios";

class PrivateBaseRequest{
    controller = ""

    async getAll() {
      const response = await userRequest.get(`${this.controller}`);
      return response.data;  
    }
  
    async deleteById(id) {
      const response = await userRequest.delete(
        `${this.controller}/${id}`
      );
      return response.status;
    }
  
    async insert(data) {
      const response = await userRequest.post(`${this.controller}`, data);
      return response; 
    }

    async updateById(id, data) {
      const response = await userRequest.put(
        `${this.controller}/${id}`,
        data
      );
     return response;
    }
}

export default PrivateBaseRequest; 