import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  background: ${(props: IProps) => props.isBlur ? 'rgba(52, 173, 181, .1)' : 'transparent'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

interface IRectangleProps {
  delay: number
}

const stretchHeight = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
`

interface IProps {
  isBlur?: boolean
}

const Wriggle = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
`

const Rectangle = styled.div`
  width: 6px; height: 60px;
  background-color: #34ADB5;
  animation-name: ${ stretchHeight };
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1.2s;
  animation-delay: ${ (props: IRectangleProps) => props.delay + 's' }
`

const Tip = styled.div`
  color: #34ADB5;
  margin-top: 4px;
`

const Loading = styled.div``

export default function (props: IProps) {
  return (
      <Wrapper isBlur={props.isBlur}>
        <Loading>
          <Wriggle>
            <Rectangle delay={ 0 } />
            <Rectangle delay={ -1.1 } />
            <Rectangle delay={ -1.0 } />
            <Rectangle delay={ -0.9 } />
            <Rectangle delay={ -0.8 } />
          </Wriggle>
          <Tip>Loading...</Tip>
        </Loading>
      </Wrapper>
  )
}
