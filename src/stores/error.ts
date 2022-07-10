import { reactive } from 'vue';
import axios from 'axios';

type Errors = Record<string, string | string[]>;

/* ---------------------------------- State --------------------------------- */
const errors = reactive<Errors>({});
/* -------------------------------------------------------------------------- */

/* --------------------------------- Actions -------------------------------- */
export const getError = (property: string) => errors[property];

export const setError = (property: string, error: string | string[]) => {
  errors[property] = error;
};

export const hasError = (property: string) => !!errors[property];

export const hasErrors = (...properties: string[]) => {
  return properties.some((property) => !!errors[property]);
};

export const hasAnyErrors = () => !!Object.keys(errors).length;

export const getFirstError = (property: string) => {
  if (!Array.isArray(errors[property])) return errors[property] as string;
  return errors[property][0];
};

export const clearErrors = () => {
  for (const property in errors) delete errors[property];
};
/* -------------------------------------------------------------------------- */

/* --------------------------- Axios Interceptors --------------------------- */
axios.interceptors.request.use((config) => {
  clearErrors();
  return config;
});

axios.interceptors.response.use(
  (response) => {
    clearErrors();
    return response;
  },
  (error) => {
    if (!axios.isAxiosError(error)) throw error;
    if (!(error.response as any)?.data.errors) {
      setError(
        'message',
        (error.response as any)?.data.message || 'Something went wrong.'
      );
      return;
    }
    for (const property in (error.response as any)?.data.errors) {
      errors[property] = (error.response as any)?.data.errors[property];
    }
    throw error;
  }
);
/* -------------------------------------------------------------------------- */
