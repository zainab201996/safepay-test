import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";
import { StudentsGrid } from "./components/StudentsGrid";
import { StudentLookup } from "./components/StudentLookup";
import LogoImage from "./assets/Logos/1/Safepay-logo-01_white.svg";
const NavBar = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.blue};
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
const Logo = styled.img`
  height: 40px;
  display: fixed;
  position: absolute;
  left: 10px;
  top: 5px;
`;
function App() {
  return (
    <Router>
      <NavBar>
        <Logo src={LogoImage} alt="SafePay Logo" />
        <StyledLink to="/">Grid</StyledLink>
        <StyledLink to="/lookup">Lookup</StyledLink>
      </NavBar>
      <Routes>
        <Route path="/" element={<StudentsGrid />} />
        <Route path="/lookup" element={<StudentLookup />} />
      </Routes>
    </Router>
  );
}

export default App;
