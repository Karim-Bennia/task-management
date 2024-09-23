// styles/StyledComponents.tsx
"use client"
import styled from 'styled-components';
import { Input, Button } from 'antd';

export const StyledInput = styled(Input)`
  border-radius: 6px;
  padding: 0.57rem;
`;

export const StyledButton = styled(Button)`
  border-radius: 6px;
  height: 40px;
  font-weight: 500;
`;
