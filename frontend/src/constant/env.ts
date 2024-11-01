export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

const nextShowLogger = !(
  process.env.NEXT_PUBLIC_SHOW_LOGGER &&
  process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true'
);

export const showLogger = isLocal ? true : nextShowLogger;

export const backendUrl =
  process.env.NEXT_BACKEND_URL ?? 'http://localhost:3000/api';
