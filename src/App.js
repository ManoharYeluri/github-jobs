import './App.css';
import useFeatchJobs from "./useFeatchJobs";
import { Container } from "react-bootstrap";
import { useState } from 'react';
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFeatchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} disable={!!error}></SearchForm>
      {!error && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {loading && <h1>Loading...</h1>}
      {loading && <div style={{ height: "150vh" }}></div>}
      {error && <h1 className="text-center">Oh snap! Some Error occured!</h1>}
      {jobs.map(job => {
        return (
          <Job key={job.id} job={job} />
        )
      })}
      {!error && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
    </Container>
  );
}

export default App;
