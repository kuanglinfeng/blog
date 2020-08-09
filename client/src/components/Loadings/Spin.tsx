import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Wrapper } from './Loading'

const SpinWrapper = styled(Wrapper)``

const autoRotate = keyframes`
  100% {
    transform: rotateZ(405deg);
  }
`

const Spin = styled.div`
  position: relative;
  font-size: 20px;
  width: 1em; height: 1em;
  display: flex;
  flex-wrap: wrap;
  transform: rotateZ(45deg);
  animation: ${ autoRotate } 1.2s infinite linear;
`

const Circle = styled.span`
  display: block;
  width: 10px; height: 10px;
  border-radius: 100%;
  background: #34adb5;
  transform: scale(.75);
  opacity: .3;
`

export default function () {
  return (
    <SpinWrapper>
      <Spin>
        <Circle />
        <Circle />
        <Circle />
        <Circle />
      </Spin>
    </SpinWrapper>
  )
}