import { useState } from "react";
import SearchForm from "./components/searchForm/SearchForm";
import { IFormData, ISearchData } from "./types/searchDataType";
import { searchUsers } from "./servises/api";

import styles from "./App.module.scss";

function App() {
  const [data, setData] = useState<ISearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (value: IFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchUsers(value.email, value.number);

      setData(response);

      setLoading(false);
    } catch (error: any) {
      setData(null);

      if (error.name !== "CanceledError") {
        setError(error.message);
      }

      console.error(error);
    }
  };

  return (
    <div className={styles.wraper}>
      <h2>Search App</h2>
      <SearchForm getData={getData} />
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}{" "}
      {!loading && !data?.payload && data !== null && (
        <div className={styles.notFound}>User not found</div>
      )}
      {data && data.payload && !loading && (
        <div className={styles.userData}>
          <span>{data.payload.email}</span>
          <span>{data.payload.number}</span>
        </div>
      )}
    </div>
  );
}

export default App;
