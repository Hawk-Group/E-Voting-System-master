import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResults } from '../redux/actions';

const ResultsPage = () => {
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  return (
    <div className="results-page">
      <h2>Voting Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.candidateId}>
            {result.candidateName}: {result.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;