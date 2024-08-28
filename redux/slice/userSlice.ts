import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const userUrl = "http://localhost:8080/users";

export const getUsers = createAsyncThunk("users/getUser", async () => {
  const response = await axios.get(userUrl);
  return response.data;
});

export const deleteUsers = createAsyncThunk("users/deleteUser", async (id: string) => {
  const response = await axios.delete(`${userUrl}/${id}`);
  return response.data;
});

export const postUsers = createAsyncThunk(
  "users/postUser",
  async (newp: Partial<User>) => {
    const response = await axios.post(userUrl, newp);
    return response.data;
  }
);
export const updateUsers = createAsyncThunk(
  "users/updateUser",
  async ({ id, newp }: { id: number; newp: Partial<User> }) => {
    const response = await axios.put(`${userUrl}/${id}`, newp);
    return response.data;
  }
);

export interface User {
  _id:String
  username: String;
  weight: Number;
  height: Number;
  age: Number;
  water_goal: Number;
  sleep_goal: Number;
  exercise_goal: Number;
  password: String;
  islogin: Boolean;
}

export interface UserState {
  user: User;
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  user: {
    _id:'0',
    username: "",
    weight: 0,
    height: 0,
    age: 0,
    water_goal: 0,
    sleep_goal: 0,
    exercise_goal: 0,
    password: "",
    islogin: false,
  },
  users: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(postUsers.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(postUsers.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteUsers.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.users = state.users.filter(
            (v) => v._id !== action.payload.id
          );
          state.loading = false;
        }
      )
      .addCase(deleteUsers.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUsers.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
