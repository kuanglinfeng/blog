import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  height: 100px;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
  > p {
    margin: 0; padding: 8px;
  }
`

export default () => {
  return (
    <Wrapper>
      <p>Copyright © Flinn Kuang</p>
      <p>@2020 赣ICP备19002379号-1</p>
    </Wrapper>
  )
}