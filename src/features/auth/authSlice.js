import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthCookie, getAuthCookie, removeAuthCookie } from '../../utils/cookie';
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "https://api.fetanmarket.com";
console.log("REACT_APP_API_URL: ", REACT_APP_API_URL)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth/register`, {
        email: userData.email,
        username: userData.username,
        role_name: userData.role_name,
        phone_number: userData.phone,
        password: userData.password
      });
      return {
        data: response.data,
        status: response.status,
        error: response.error
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/auth/login`,
        new URLSearchParams({
          username: credentials.username,
          password: credentials.password,
          phone_number: credentials.phone_Number,
          scope: '',
          client_id: 'string',
          client_secret: 'string'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getAuthCookie();
      if (!token) {
        throw new Error('No token found');
      }
      console.log('REACT_APP_API_URL: protected', REACT_APP_API_URL)
      const response = await axios.get(
        `${REACT_APP_API_URL}/protected/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch profile' });
    }
  }
);

export const verifyPhone = createAsyncThunk(
  'auth/verifyPhone',
  async ({code, phone_number}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/auth/verify-phone`,{ code, phone_number } 
      );
      return {
        data: response.data,
        status: response.status};
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'OTP failed' });
    }
  }
);

export const verifyEmail= createAsyncThunk(
  'auth/verify-emial',
  async ({otp, email}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/auth/verify-email`,{ otp, email } 
      );
      return {
        data: response.data,
        status: response.status};
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'OTP failed' });
    }
  }
);

export const loginWithNumber = createAsyncThunk(
  'auth/loginWithNumber',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/auth/login-with-phone`,
        {
          phone_number: credentials.phone_Number,
          role_name: credentials.role_name
        },
        {
          headers: {
            'Content-Type': 'application/json' // ✅ Send as JSON
          }
        }
      );

      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const loginverify = createAsyncThunk(
  'auth/loginverify',
  async ({ otp, phone_number, role_name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/auth/verify-otp`,
        { otp, phone_number, role_name }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'OTP verification failed' });
    }
  }
);

export const logoutUser = () => {
  return {
    type: 'auth/logout'
  };
};

export const logout = createAsyncThunk('auth/logout', () => {
  // No API call needed, we'll handle everything in the reducer
  return true;
});

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
  token: null,
  profile: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.success = true;
        setAuthCookie(action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
        state.success = false;
        state.isAuthenticated = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch profile';
        state.isAuthenticated = false;
        removeAuthCookie();
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.profile = null;
        state.isAuthenticated = false;
        removeAuthCookie();
      })
      .addCase(loginverify.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;              
        state.token = action.payload.access_token;     
        state.isAuthenticated = true;
        state.success = true;
        setAuthCookie(action.payload.access_token);    
      })
      .addCase(loginverify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'OTP verification failed';
        state.success = false;
        state.isAuthenticated = false;
      });
      
  }
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
