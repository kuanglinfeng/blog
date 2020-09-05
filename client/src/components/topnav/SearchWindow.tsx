import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import close from '../../assets/close.png'
import handleMarkDownText from '../../utils/handleMarkDownText'
import Spin from '../loadings/Spin'
import ArticleServices from '../../services/ArticleServices'
import { IArticle } from '../../types/commonTypes'
import { NavLink as Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;  height: 100%;
  padding: 60px 20px;
  z-index: 9999;
`

const ModalOverlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%;  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 1;
`

const Modal = styled.div`
  position: fixed;
  height: 80%;  width: 100%;
  max-width: 640px;
  left: 50%;  top: 0;
  margin: 72px 0 0 -320px;
  background: #fff;
  box-shadow: 0 7px 8px -4px rgba(0,0,0,.2), 0 13px 19px 2px rgba(0,0,0,.14), 0 5px 24px 4px rgba(0,0,0,.12);
  z-index: 3;
  border-radius: 12px;
  overflow: hidden;
`

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 64px;
  background-color: #34ADB5;
  z-index: 3;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const Input = styled.input`
  background: transparent;
  display: block;
  width: 100%;
  padding: 0 50px;
  height: 64px;
  font-size: 16px;
  line-height: 1.7;
  vertical-align: middle;
  color: #fff;
  border: none;
  outline: none;
  &::placeholder {
    color: #bbb;
  }
`

const CloseWrapper = styled.div`
  position: absolute;
  top: 16px; right: 12px;
  cursor: pointer;
`

const Close = styled.span`
  display: inline-block;
  background: url(${ close });
  background-size: cover;
  width: 30px; height: 30px;
`

const Main = styled.main`
  position: absolute;
  padding: 64px 50px 80px 50px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 12px;
`

const List = styled.ul`
  list-style: none;
`

const ListItem = styled.li`
  border-bottom: 1px solid #e6e8ea;
`

const Title = styled.h2`
  display: inline-block;
  max-width: 100%;
  color: #4d4d4d;
  font-size: 16px;
  font-weight: 700;
  padding: 1px;
  margin-bottom: 2px;
  line-height: 1.7;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Content = styled.div`
  //overflow: scroll;
  display: block;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 1.7;
  color: grey;
`

const NotData = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
  padding: 20px 0;
`

interface IProps {
  visible: boolean
  onClose: () => void
  value: string
  onChange: (value: string) => void
}


export default function (props: IProps) {

  const [articles, setArticles] = useState<IArticle[] | null>(null)

  async function search() {
    const result = await ArticleServices.search({ keywordProp: 'title', keyword: props.value })
    setArticles(result.data)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.visible) {
      // 隐藏使body滚动条
      document.body.classList.add('onModal');
      (async () => {
        await search()
      })()
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible])

  const onSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      await search()
    }
  }

  return (
    props.visible ?
      <Wrapper>
        <Modal>
          <Header>
            <Input
              ref={inputRef}
              placeholder='搜索文章'
              value={ props.value }
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                props.onChange(e.target.value)
              } }
              onKeyDown={ onSubmit }
            />
            <CloseWrapper onClick={ () => props.onClose() }>
              <Close />
            </CloseWrapper>
          </Header>
          <Main>
            <List>
              {
                articles === null ? <Spin /> : (articles.length !== 0 ? articles.map(article => {
                  return (
                    <ListItem key={ article._id }>
                      <Link to={ `/detail/${ article._id }` } onClick={ () => props.onClose() }>
                        <Title>{ article.title }</Title>
                      </Link>
                      <Content>{ handleMarkDownText(article.content) }</Content>
                    </ListItem>
                  )
                }) : <NotData>O(∩_∩)O 没有找到相关文章。。。</NotData>)
              }
            </List>
          </Main>
        </Modal>
        <ModalOverlay />
      </Wrapper> : null
  )
}