import React from "react";
import styled from "styled-components";
import colors from "../colors";

const ContentStyled = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-image: linear-gradient(
    45deg,
    ${colors.gradiantPrimary} 0%,
    ${colors.gradiantAccent} 100%
  );
`;

const Content = ({ children, ...rest }) => {
  return (
    <div>
      <ContentStyled {...rest}>{children}</ContentStyled>
    </div>
  );
};

export default Content;
