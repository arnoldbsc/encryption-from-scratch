import styled from "styled-components";
import colors from "../colors";

export const Table = styled.table`
  font-family: "Courier New", monospace;
  border-collapse: collapse;
  width: 100%;
`;

export const THead = styled.thead`
  display: block;
`;

export const TBody = styled.tbody`
  display: block;
  height: 6.2rem;
  overflow-y: auto;
`;

export const TH = styled.th`
  width: 20%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-align: left;
  background-color: ${colors.accent};
  color: white;
`;

export const TD = styled.td`
  width: 20%;
  padding: 0.2rem 1rem 0.2rem 1rem;
`;

export const TR = styled.tr`
  background-color: white;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;
