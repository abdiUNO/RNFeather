import { Text as BaseText } from "react-native"

import styled from "styled-components"

export default styled(BaseText)`
  font-family: "Helvetica Neue";
  font-size: ${props => props.size || 15};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  color: ${props =>
    props.color ? props.color : props.subdue ? "#7f8c8d" : "black"};
  text-align: ${props => (props.align ? props.align : "left")};
`
