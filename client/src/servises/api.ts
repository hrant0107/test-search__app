import axios from "axios";
import { IFormData } from "../types/searchDataType";

let cancelToken: any;

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3002";


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
      `${serverUrl}/user`,
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
