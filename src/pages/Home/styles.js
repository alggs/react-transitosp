import styled from "styled-components"
import { shade } from 'polished';

const buttonColor = '#ED1C24';

export const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 8px;
  column-gap: 8px;
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  width: 512px;
  height: 64px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: ${buttonColor};
  transition: background-color 0.2s;
  color: #F0F0F5;
  font-weight: bold;

  &:hover {
    background: ${shade(0.25, buttonColor)};
  }
`

export const Input = styled.input`
    border-radius: 14px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`