import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://aoqhvldcenjveyifrcrp.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvcWh2bGRjZW5qdmV5aWZyY3JwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDIzOTY2NCwiZXhwIjoxOTk5ODE1NjY0fQ.A2VEOiEVHf6eyB__StxPHXBjo4oxJHTeC5apW4oSEtU"
);

const initialState = {
	status: "idle",
	results: [],
	errors: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
	const { data, error } = await supabase.auth.admin.listUsers();

	if (error) {
		throw error;
	}
	console.log(data.users);
	return data;
});

export const updateUser = createAsyncThunk(
	"user/updateUser",
	async ({ userId, fullname, role }) => {
		const { data, error } = await supabase.auth.admin.updateUserById(userId, {
			user_metadata: { fullname, role },
		});

		if (error) {
			throw error;
		}

		return data.user;
	}
);

export const deleteUser = createAsyncThunk(
	"user/deleteUser",
	async (userId) => {
		const { data, error } = await supabase.auth.admin.deleteUser(userId);

		if (error) {
			throw error;
		}

		return data.user;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchUser.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchUser.fulfilled]: (state, action) => {
			state.status = "success";
			state.results = action.payload.users;
		},
		[fetchUser.rejected]: (state, action) => {
			state.sttus = "error";
			state.errors = action.errors;
		},
		[updateUser.pending]: (state, action) => {
			state.status = "loading";
		},
		[updateUser.fulfilled]: (state, action) => {
			state.status = "success";
			const existingUser = state.results.find(
				(user) => user.id == action.payload.id
			);

			if (existingUser) {
				existingUser.role = action.payload.role;
				existingUser.fullname = action.payload.fullname;
			}
		},
		[updateUser.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		},
		[deleteUser.pending]: (state, action) => {
			state.status = "loading";
		},
		[deleteUser.fulfilled]: (state, action) => {
			state.status = "success";
			const filterUser = state.results.filter(
				(user) => user.id !== action.payload.id
			);

			state.results = filterUser;
		},
		[deleteUser.rejected]: (state, action) => {
			state.status = "error";
			state.error = action.error.message;
		},
	},
});

export const getAllUser = (state) => state.user.results;
export const getStatusUser = (state) => state.user.status;

export default userSlice.reducer;
