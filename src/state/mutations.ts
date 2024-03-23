import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLogin = () =>
  useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/sessions', data, { withCredentials: true });
    },
  });

export const useRateMovies = ({ onSuccess }) =>
  useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/user_movies/many', data, { withCredentials: true });
    },
    onSuccess: (res) => onSuccess(res.data),
  });

export const useCreateMovies = ({ onSuccess }) =>
  useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/movies/many', data, { withCredentials: true });
    },
    onSuccess: (res) => onSuccess(res.data),
  });
