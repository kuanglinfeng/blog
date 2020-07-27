import { Form, Input, Button, message } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import { IArticle } from '../services/ArticleService'
import EditTagGroup from './EditTagGroup'

const formItemLayout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 18,
    offset: 1
  }
}

const buttonLayout = {
  labelCol: {
    span: 0
  },
  wrapperCol: {
    span: 19,
    offset: 3
  }
}

const textAreaLayout = {
  labelCol: {
    span: 0
  },
  wrapperCol: {
    span: 20,
    offset: 1
  }
}

interface IProps {
  onSubmit: (article: IArticle) => Promise<string | void>
  article?: IArticle
}

function ArticleForm(props: IProps) {

  const history = useHistory()

  const onFinish = async (values: any) => {
    values.publishTime = new Date()
    const result = await props.onSubmit(values)
    if (result) {
      message.error(result)
    } else {
      message.success(`${ props.article ? '编辑' : '添加' }成功`, 1, () => {
        history.push('/article')
      })
    }
  }

  return (
    <Form
      { ...formItemLayout }
      name="basic"
      initialValues={ {
        remember: true,
      } }
      onFinish={ onFinish }
      fields={[
        {name: 'title', value: props.article?.title},
        {name: 'tagList', value: props.article?.tagList},
        {name: 'content', value: props.article?.content},
      ]}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={ [
          {
            required: true,
            message: '请输入文章标题',
          },
        ] }
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='tagList'
        label='标签'
        rules={ [{ required: true, message: '请最少添加一个标签' }] }
      >
        <EditTagGroup />
      </Form.Item>
      <Form.Item
        name='content'
        { ...textAreaLayout }
      >
        <Input.TextArea autoSize={ { minRows: 20 } } />
      </Form.Item>
      <Form.Item
        { ...buttonLayout }
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ArticleForm
