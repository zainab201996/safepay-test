import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { studentsApi } from "../api/studentsApi";

export interface Student {
  uuid: number;
  age: number;
  class: number;
  gpa: string;
  name: string;
  sex: string;
  siblings: number;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  recentLookup: Student | null;
}

const inititialState: StudentState = {
  students: [],
  loading: false,
  error: null,
  recentLookup: null,
};
export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  const response = await studentsApi.fetchAll();
  return response.data;
});
export const fetchStudentById = createAsyncThunk(
  "students/fetchById",
  async (uuid: number) => {
    const response = await studentsApi.fetchById(uuid);
    return response.data;
  }
);
export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData: Omit<Student, "uuid">) => {
    const response = await studentsApi.add(studentData);
    const uuid = response.data.uuid;
    const newStudentResponse = await studentsApi.fetchById(uuid);
    return newStudentResponse.data;
  }
);
export const updateStudent = createAsyncThunk(
  "students/update",
  async (studentData: Student) => {
    const response = await studentsApi.update(studentData.uuid, studentData);
    if (response.data.success) {
      const updatedStudentResponse = await studentsApi.fetchById(
        studentData.uuid
      );
      return updatedStudentResponse.data;
    } else return studentData;
  }
);
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (uuid: number) => {
    await studentsApi.delete(uuid);
    return uuid;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: inititialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStudents.fulfilled,
      (state, action: PayloadAction<Student[]>) => {
        state.loading = false;
        state.students = action.payload;
      }
    );
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch students";
    });
    builder.addCase(fetchStudentById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStudentById.fulfilled,
      (state, action: PayloadAction<Student>) => {
        state.loading = false;
        if (action.payload) {
          state.recentLookup = action.payload;
        } else {
          state.error = "Student not found";
        }
      }
    );
    builder.addCase(fetchStudentById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch student";
    });
    builder.addCase(addStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addStudent.fulfilled,
      (state, action: PayloadAction<Student>) => {
        state.loading = false;
        state.students.push(action.payload);
      }
    );
    builder.addCase(addStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add student";
    });
    builder.addCase(updateStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateStudent.fulfilled,
      (state, action: PayloadAction<Student>) => {
        state.loading = false;
        const index = state.students.findIndex(
          (s) => s.uuid === action.payload.uuid
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      }
    );
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update student";
    });
    builder.addCase(deleteStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteStudent.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.students = state.students.filter(
          (s) => s.uuid !== action.payload
        );
      }
    );
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete student";
    });
  },
});

export const { clearError } = studentSlice.actions;
export default studentSlice.reducer;
