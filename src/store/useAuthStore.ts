import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  User,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthState = {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      initialized: false,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),

      signIn: async (email: string, password: string) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        set({ user: result.user });
        return result.user;
      },

      signUp: async (email: string, password: string) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        set({ user: result.user });
        return result.user;
      },

      signInWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        set({ user: result.user });
        return result.user;
      },

      signOut: async () => {
        await firebaseSignOut(auth);
        set({ user: null });
      }
    }),
    {
      name: 'auth-storage',
      // Only persist the user, not functions
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// Utility hook for backward compatibility with AuthContext
export const useAuth = () => {
  const { user, loading, signIn, signUp, signInWithGoogle, signOut } = useAuthStore();
  return { user, loading, signIn, signUp, signInWithGoogle, signOut };
}; 