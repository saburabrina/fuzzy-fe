import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useMovies = () =>
  useQuery({
    queryFn: () => {
      return api
        .get('/movies')
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },
    retry: false,
    queryKey: ['MOVIES'],
  });

export const jobStatus = (jobId) => {
  return api
    .get(`/jobs/${jobId}/status`)
    .then((res) => res.data)
    .catch((err) => err);
};
