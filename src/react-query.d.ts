import { QueryClient } from '@tanstack/react-query';

export {};

declare global {
  interface Window {
    queryClient?: QueryClient;
  }
}
