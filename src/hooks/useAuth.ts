// Re-export the utility hook from the auth store
import { useAuth as useAuthFromStore } from '@/store/useAuthStore';

// Re-export the hook for easier imports
export const useAuth = useAuthFromStore; 