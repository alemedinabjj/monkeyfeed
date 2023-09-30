import { createContext, useReducer, useEffect, useContext } from 'react';
import { api } from '../lib/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

type State = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null; 
};

type Action =
  | { type: 'LOGIN'; payload: { token: string; user: User } }
  | { type: 'LOGOUT' };


const initialState: State = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('@token-monkey', action.payload.token);
      localStorage.setItem('@user-monkey', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      localStorage.removeItem('@token-monkey');
      localStorage.removeItem('@user-monkey');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};


export const AuthContext = createContext({
  ...initialState,
  login: (data: any) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function login(data: any) {
    console.log(data)
    const response = api.post('/auth/login', data).then((response) => {
      const { token } = response.data
      api.get('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        
        dispatch({
          type: 'LOGIN',
          payload: {
            token,
            user: response.data.user,
          },
        });

        window.location.href = '/';

      }
      )
    })

    return response
  }

  console.log('state', state)

  useEffect(() => {
    const token = localStorage.getItem('@token-monkey');
    const user = localStorage.getItem('@user-monkey');

    if (token && user) {
      dispatch({
        type: 'LOGIN',
        payload: {
          token,
          user: JSON.parse(user),
        },
      });


      return;
    }

    dispatch({
      type: 'LOGOUT',
    });

  }, []);

  useEffect(() => {
    if (state.token) {
      api.defaults.headers.Authorization = `Bearer ${state.token}`;
    }
  },[state.token]);




  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout: () => dispatch({ type: 'LOGOUT' }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

