import axios from "axios";
import { IFormData } from "../types/searchDataType";

let cancelToken: any;

export const searchUsers = async (
  email: string,
  number: string
): Promise<{ status: string; payload: IFormData }> => {
  try {
    if (cancelToken) {
      cancelToken.cancel("operation canceled");
    }
    cancelToken = axios.CancelToken.source();
    const { data } = await axios.post(
      `http://localhost:3002/search`,
      {
        email,
        number,
      },
      { cancelToken: cancelToken.token }
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
