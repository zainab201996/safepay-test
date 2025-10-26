import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

export const StudentCard = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state: any) => state.studentReducer);
  return <div></div>;
};
