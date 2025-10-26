import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchStudentById } from "../redux/studentSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
const Button = styled.button`
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
const Card = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.blue};
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  align-items: center;
  h3 {
    margin: 0 0 0.5rem 0;
  }
  p {
    margin: 0.2rem 0;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
  input {
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary.blue};
    border-radius: 4px;
    width: 150px;
  }
  label {
    font-weight: bold;
  }
`;
const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
export const StudentLookup = () => {
  const dispatch = useAppDispatch();
  const [uuid, setUuid] = useState<number | null>(null);
  const { recentLookup, error } = useAppSelector(
    (state: any) => state.students
  );
  return (
    <Container>
      <SearchContainer>
        <input
          type="number"
          placeholder="Enter Student's UUID"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUuid(Number(e.target.value));
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && uuid) {
              dispatch(fetchStudentById(Number(uuid)));
            }
          }}
        />
        <Button
          onClick={() => {
            if (uuid) {
              dispatch(fetchStudentById(Number(uuid)));
            }
          }}
        >
          Lookup Student
        </Button>
      </SearchContainer>
      {error && <Card>{error}</Card>}
      {recentLookup && (
        <>
          <h2>Recent Success Lookup</h2>
          <Card>
            <CardRow>
              <h3>Name</h3>
              <p>{recentLookup.name}</p>
            </CardRow>

            <CardRow>
              <h3>Age</h3>
              <p>{recentLookup.age}</p>
            </CardRow>
            <CardRow>
              <h3>Class</h3>
              <p>{recentLookup.class}</p>
            </CardRow>
            <CardRow>
              <h3>GPA</h3>
              <p>{recentLookup.gpa}</p>
            </CardRow>
            <CardRow>
              <h3>Gender</h3>
              <p>{recentLookup.sex}</p>
            </CardRow>
            <CardRow>
              <h3>Siblings</h3>
              <p>{recentLookup.siblings}</p>
            </CardRow>
          </Card>
        </>
      )}
    </Container>
  );
};
