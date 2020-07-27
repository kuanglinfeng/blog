import { Form, Input, Button, Checkbox, message } from 'antd'
import React from 'react'
import { IArticleState } from '../../redux/reducers/articleReducer'
import EditTagGroup from '../../components/EditTagGroup'
import ArticleService, { IArticle } from '../../services/ArticleService'
import { RouteComponentProps } from 'react-router'

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

interface IProps extends RouteComponentProps<any> {}

async function onSubmit(article: IArticle) {
  const result = await ArticleService.add(article)
  return result.data ? '' : result.error
}

function AddArticle(props: IProps) {

  const onFinish = async (values: any) => {
    values.publishTime = new Date()
    const result = await onSubmit(values)
    if (result) {
      message.error(result)
    } else {
      message.success('添加成功', 1, () => {
        props.history.push('/article')
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
        rules={[{required: true, message: '请最少添加一个标签'}]}
      >
        <EditTagGroup />
      </Form.Item>
      <Form.Item
        name='content'
        {...textAreaLayout}
      >
        <Input.TextArea autoSize={{minRows: 20}} />
      </Form.Item>
      <Form.Item
        {...buttonLayout}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddArticle
