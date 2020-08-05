import React from 'react'
import styled from 'styled-components'

const About = styled.div`
  padding: 20px;
  background: #fff;
`

const Title = styled.h3``

const List = styled.ul`
  list-style: circle;
`

const ListItem = styled.li`
  padding: 3px;
  & > a {
    color: blue;
  }
`

export default function () {

  return (
    <About>
      <Title>关于我</Title>
      <List>
        <ListItem>东华理工大学软件工程大四学生</ListItem>
        <ListItem>喜欢并专注于前端技术</ListItem>
        <ListItem>联系邮箱：flinnkuang@foxmail.com</ListItem>
      </List>
      <Title>关于博客</Title>
      <List>
        <ListItem>
          博客使用到的主要技术栈为React & TypeScript，前端UI由自己设计，后端管理系统UI使用了Ant Design，前后端均由本人编写。
        </ListItem>
        <ListItem>
          博客内容为学习工作过程中的一些技术总结和日志琐事，除非特殊声明，博客内容皆为个人原创，转载请标注文章来源哦。
        </ListItem>
        <ListItem>
          如果对博客内容有疑问或者发现了纰漏或是错误的朋友，可以发送邮件给我哦，我会及时回复和修正。
        </ListItem>
      </List>
      <Title>Github地址</Title>
      <List>
        <ListItem>
          <a href="https://github.com/kuanglinfeng" target="blank">点击这里</a>
        </ListItem>
      </List>
    </About>
  )
}