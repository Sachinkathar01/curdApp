import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: true,
  error: null,
  searchTerm: '',
};

export const createUser = createAsyncThunk(
  "createUser", 
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("https://67857ae31ec630ca33a8ce38.mockapi.io/curd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const showUsersData = createAsyncThunk("showUsersData", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://67857ae31ec630ca33a8ce38.mockapi.io/curd");
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteUser = createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{
  try {
    const response = await fetch(`https://67857ae31ec630ca33a8ce38.mockapi.io/curd/${id}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      

    })
   
    return response.ok ? {id} : rejectWithValue("Failed to delete");
    
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://67857ae31ec630ca33a8ce38.mockapi.io/curd/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Extract and return the JSON data from the response
      const responseData = await response.json();
      return responseData;  // Return the actual data, not the Response object

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const UsersDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showUsersData.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUsersData.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(showUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending,(state)=>{
        state.loading=true;
      })
      .addCase(deleteUser.fulfilled,(state,action)=>{
        state.users=state.users.filter((user)=>user.id !== action.payload.id)
        state.loading=false;
      })
      .addCase(deleteUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
      .addCase(updateUser.pending,(state)=>{
        state.loading=true;

      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        const {id,name,email,phone,gender} = action.payload;
        const existingUser = state.users.find((user)=>user.id === id);
        if(existingUser){
          existingUser.name=name;
          existingUser.email=email;
          existingUser.phone=phone;
          existingUser.gender= gender;}
          state.loading=false;

      })
      .addCase(updateUser.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.payload;
        })
  },
});

export const { setSearchTerm } = UsersDetailsSlice.actions;
export default UsersDetailsSlice.reducer;
