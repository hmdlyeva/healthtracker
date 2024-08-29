import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const userUrl = "http://localhost:8080/activities";

export const getActivities = createAsyncThunk("users/getActivities", async () => {
  const response = await axios.get(userUrl);
  return response.data;
});

export const deleteActivities = createAsyncThunk("users/deleteActivities", async (id: String) => {
  const response = await axios.delete(`${userUrl}/${id}`);
  return response.data;
});

export const postActivities = createAsyncThunk(
  "users/postActivities",
  async (newp: Partial<Activity>) => {
    const response = await axios.post(userUrl, newp);
    return response.data;
  }
);
export const updateActivities = createAsyncThunk(
  "users/updateActivities",
  async ({ id, newp }: { id: String; newp: Partial<Activity> }) => {
    const response = await axios.put(`${userUrl}/${id}`, newp);
    return response.data;
  }
);

export interface UserActivity {
  _id?: String;
  daily_water: Number;
  daily_sleep: Number;
  daily_exercise: Number;
  day: Number;
}

export interface Activity {
  _id:String
  userid: String;
  user_activity: UserActivity[];
}

export interface ActivityState {
  activity: Activity;
  activities: Activity[];
  loading: boolean;
}

const initialState: ActivityState = {
    activity: {
    _id:'0',
    userid: "",
    user_activity:[]
  },
  activities: [],
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
      .addCase(getActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivities.fulfilled, (state, action: PayloadAction<Activity[]>) => {
        state.activities = action.payload;
        state.loading = false;
      })
      .addCase(getActivities.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(postActivities.fulfilled, (state, action: PayloadAction<Activity>) => {
        state.activities.push(action.payload);
        state.loading = false;
      })
      .addCase(postActivities.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteActivities.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.activities = state.activities.filter(
            (v) => v._id !== action.payload.id
          );
          state.loading = false;
        }
      )
      .addCase(deleteActivities.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateActivities.fulfilled, (state, action: PayloadAction<Activity>) => {
        state.activity = action.payload;
        state.loading = false;
      })
      .addCase(updateActivities.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
