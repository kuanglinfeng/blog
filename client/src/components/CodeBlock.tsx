import React, { useEffect } from 'react'
import highLight from 'highlight.js'
// 主题文件：github、github-gist、color-brewer、railscasts、agate、atom-one-dark、rainbow、atom-one-light
import 'highlight.js/styles/github-gist.css'  //代码块样式

interface IProps {
  value: string
  language: string
}

export default function (props: IProps) {

  const ref = React.createRef<HTMLElement>()

  useEffect(() => {
    if (ref.current) {
      highLight.highlightBlock(ref.current)
    }
  })

  return (
    <pre>
      <code ref={ ref } className={ `language-${ props.language }` }>
        { props.value }
      </code>
    </pre>
  )
}