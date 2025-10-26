import React from "react";
import styled from "styled-components";

const TranslucentBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  height: 100vh;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 90%;
  margin-top: 3rem;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  &:hover {
    color: black;
  }
`;
interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  children,
}) => {
  if (!open) return null;

  return (
    <TranslucentBG onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContainer>
    </TranslucentBG>
  );
};
