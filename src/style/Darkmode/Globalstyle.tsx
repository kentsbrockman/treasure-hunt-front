import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "./DefaultTheme";

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>
`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
`
