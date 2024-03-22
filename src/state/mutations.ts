import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useRateMovies = () =>
  useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/user_movies/many', data, { withCredentials: true });
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/sessions', data, { withCredentials: true });
    },
  });
