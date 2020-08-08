import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from './CodeBlock'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: #000;
  max-width: 1012px;
  margin: 12px auto;
  padding-right: 16px;
  padding-left: 16px;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #eee;
`

interface IProps {
  content: string
}

function Markdown(props: IProps) {
  return (
    <Wrapper>
      <ReactMarkdown source={props.content} renderers={{code: CodeBlock}}/>
    </Wrapper>
  )
}

export default Markdown