import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import {
  addStudent,
  deleteStudent,
  fetchStudents,
  updateStudent,
  type Student,
} from "../redux/studentSlice";
import { ModalWrapper } from "./ModalWrapper";
import { theme } from "../style/theme";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Table = styled.table`
  align-self: center;
  width: 60%;
  border: 2px solid ${({ theme }) => theme.colors.primary.blue};
  border-radius: 8px;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1rem;
  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.primary.blue};
    padding: 0.5rem;
    align-self: center;
    text-align: center;
    width: auto;
    input {
      width: 80%;
      border-radius: 4px;
      border: 1px solid ${({ theme }) => theme.colors.primary.blue};
      padding: 0.3rem;
    }
  }
  button {
    color: white;
    background-color: ${({ theme }) => theme.colors.primary.blue};
    border-radius: 4px;
    border: none;
    padding: 0.3rem 0.6rem;
    margin: 0 0.2rem;
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.blue};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.black};
    transition: background-color 0.6s ease;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  label {
    font-weight: bold;
  }
  input {
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary.blue};
    border-radius: 4px;
  }
  button {
    background-color: ${({ theme }) => theme.colors.primary.blue};
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 4px;
  }
`;
const SortContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary.blue};
  display: flex;
  gap: 1rem;

  select {
    border: 1px solid ${({ theme }) => theme.colors.primary.blue};
    border-radius: 4px;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.primary.blue};
    background-color: white;
  }
`;
const Loader = styled.div`
  display: fixed;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  border: 8px solid #f3f3f3;
  border-top: 8px solid ${({ theme }) => theme.colors.primary.blue};
  border-radius: 50%;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6rem;
  width: 60%;
`;
export const StudentsGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, loading, error } = useSelector(
    (state: any) => state.students
  );
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    gpa: "",
    sex: "",
    siblings: "",
  });
  const [filter, setFilter] = useState({
    uuid: "",
    name: "",
    age: "",
    class: "",
    gpa: "",
    sex: "",
    siblings: "",
  });
  const [sortKey, setSortKey] = useState<keyof Student | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedStudent) return;
    setSelectedStudent((prev) => ({
      ...(prev as Student),
      [e.target.name]: e.target.value,
    }));
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent) {
      const payload: Student = {
        uuid: selectedStudent.uuid,
        name: selectedStudent.name,
        age: Number(selectedStudent.age),
        class: Number(selectedStudent.class),
        gpa: selectedStudent.gpa,
        siblings: Number(selectedStudent.siblings),
        sex: selectedStudent.sex,
      };
      dispatch(updateStudent(payload));
      setEditModalOpen(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Omit<Student, "uuid"> = {
      name: formData.name,
      age: Number(formData.age),
      class: Number(formData.class),
      gpa: formData.gpa,
      sex: formData.sex,
      siblings: Number(formData.siblings),
    };
    dispatch(addStudent(payload));

    setFormData({
      name: "",
      age: "",
      class: "",
      gpa: "",
      sex: "",
      siblings: "",
    });
    setAddModalOpen(false);
  };
  const filteredStudents = students.filter((student: Student) => {
    return (
      (filter.uuid ? student.uuid.toString().includes(filter.uuid) : true) &&
      (filter.name
        ? student.name.toLowerCase().includes(filter.name.toLowerCase())
        : true) &&
      (filter.age ? student.age.toString().includes(filter.age) : true) &&
      (filter.class ? student.class.toString().includes(filter.class) : true) &&
      (filter.gpa ? student.gpa.toString().includes(filter.gpa) : true) &&
      (filter.sex
        ? student.sex.toLowerCase().includes(filter.sex.toLowerCase())
        : true) &&
      (filter.siblings
        ? student.siblings.toString().includes(filter.siblings)
        : true)
    );
  });
  const sortedStudents = sortKey
    ? [...filteredStudents].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : filteredStudents;

  return loading ? (
    <Loader />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <Container>
      <h1>Students</h1>

      <ControlRow>
        <SortContainer>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as keyof Student)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="gpa">GPA</option>
            <option value="class">Class</option>
            <option value="siblings">Siblings</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </SortContainer>
        <AddButton onClick={() => setAddModalOpen(!addModalOpen)}>
          Add Student
        </AddButton>
      </ControlRow>

      <Table>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>GPA</th>
            <th>Gender</th>
            <th>Siblings</th>
            <th>Action</th>
          </tr>
          <tr>
            <th>
              <input
                name="uuid"
                placeholder="UUID"
                value={filter.uuid}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <input
                name="name"
                placeholder="Name"
                value={filter.name}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <input
                name="age"
                placeholder="Age"
                value={filter.age}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <input
                name="class"
                placeholder="Class"
                value={filter.class}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <input
                name="gpa"
                placeholder="GPA"
                value={filter.gpa}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <input
                name="gender"
                placeholder="Gender"
                value={filter.sex}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              <input
                name="siblings"
                placeholder="Siblings"
                value={filter.siblings}
                onChange={handleFilterChange}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student: Student) => {
            return (
              <tr>
                <td>{student.uuid}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>{student.gpa}</td>
                <td>{student.sex}</td>
                <td>{student.siblings}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      setEditModalOpen(true);
                      setSelectedStudent(student);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: theme.colors.primary.black }}
                    onClick={() => {
                      dispatch(deleteStudent(student.uuid));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalWrapper open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <label>Class</label>

          <input
            type="number"
            name="class"
            placeholder="Class"
            value={formData.class}
            onChange={handleChange}
            required
          />
          <label>GPA</label>

          <input
            type="number"
            step="0.01"
            name="gpa"
            placeholder="GPA"
            value={formData.gpa}
            onChange={handleChange}
            required
          />
          <label>Gender</label>
          <input
            type="text"
            name="sex"
            placeholder="Gender"
            value={formData.sex}
            onChange={handleChange}
            required
          />
          <label>Siblings</label>
          <input
            type="number"
            name="siblings"
            placeholder="Siblings"
            value={formData.siblings}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </Form>
      </ModalWrapper>
      {selectedStudent && (
        <ModalWrapper
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        >
          <Form>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={selectedStudent.name}
              onChange={handleStudentChange}
            />
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={selectedStudent.age}
              onChange={handleStudentChange}
            />
            <label>Class</label>
            <input
              type="number"
              name="class"
              placeholder="Class"
              value={selectedStudent.class}
              onChange={handleStudentChange}
            />
            <label>GPA</label>
            <input
              type="number"
              step="0.01"
              name="gpa"
              placeholder="GPA"
              value={selectedStudent.gpa}
              onChange={handleStudentChange}
            />
            <label>Gender</label>
            <input
              type="text"
              name="sex"
              placeholder="Gender"
              value={selectedStudent.sex}
              onChange={handleStudentChange}
            />
            <label>Siblings</label>
            <input
              type="number"
              name="siblings"
              placeholder="Siblings"
              value={selectedStudent.siblings}
              onChange={handleStudentChange}
            />
            <button type="submit" onClick={handleEditSubmit}>
              Submit
            </button>
          </Form>
        </ModalWrapper>
      )}
    </Container>
  );
};
