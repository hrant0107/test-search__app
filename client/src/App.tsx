import styles from "./App.module.scss";

import SearchForm from "./components/searchForm/SearchForm";
import { useSearchData } from "./hooks/useSearchData";

function App() {
  const { data, loading, error, getUser } = useSearchData()

  return (
    <div className={styles.wraper}>
      <h2>Search App</h2>
      <SearchForm getUser={getUser} />
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
