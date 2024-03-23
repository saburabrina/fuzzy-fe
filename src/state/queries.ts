import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useMovies = () =>
  useQuery({
    queryFn: () => {
      return axios
        .get('http://localhost:3000/movies', { withCredentials: true, headers: { Accept: 'application/json' } })
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    retry: false,
    queryKey: ['MOVIES'],
  });

export const jobStatus = (jobId) => {
  return axios
    .get(`http://localhost:3000/jobs/${jobId}/status`, {
      withCredentials: true,
      headers: { Accept: 'application/json' },
    })
    .then((res) => res.data)
    .catch((err) => err);
};
