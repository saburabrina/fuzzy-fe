import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

export const useLogin = ({ onSuccess }) =>
  useMutation({
    mutationFn: (data) => {
      return api.post('/sessions', data);
    },
    onSuccess: onSuccess,
  });

export const useLogout = ({ onSuccess }) =>
  useMutation({
    mutationFn: () => {
      return api.delete('/logout');
    },
    onSuccess: onSuccess,
  });

export const useCreateUser = ({ onSuccess }) =>
  useMutation({
    mutationFn: (data) => {
      return api.post('/users', data);
    },
    onSuccess: onSuccess,
  });

export const useRateMovies = ({ onSuccess }) =>
  useMutation({
    mutationFn: (data) => {
      return api.post('/user_movies/many', data);
    },
    onSuccess: (res) => onSuccess(res.data),
  });

export const useCreateMovies = ({ onSuccess }) =>
  useMutation({
    mutationFn: (data) => {
      return api.post('/movies/many', data);
    },
    onSuccess: (res) => onSuccess(res.data),
  });
