import { useState } from "react";
import { IFormData, ISearchData } from "../types/searchDataType";
import { searchUsers } from "../servises/api";

export const useSearchData = () => {
  const [data, setData] = useState<ISearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = async (value: IFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchUsers(value.email, value.number)
      setData(response);
      setLoading(false);
    } catch (error: any) {
      setData(null);
      setLoading(false);
      if (error.name !== "CanceledError") {
        setError(error.message);
      }
      console.error(error);
    }
  };

  return { data, loading, error, getUser }
}