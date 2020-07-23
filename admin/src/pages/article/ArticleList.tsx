import React from 'react'
import { Button, Space, Table, Tag } from 'antd'
import Day from '../../utils/Day'
import { ColumnProps } from 'antd/es/table'

interface IArticleItem {
  key?: string
  _id?: string
  title: string
  tagList: string[]
  publishTime: Date
  content?: string
}


const columns: ColumnProps<IArticleItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '标签',
    dataIndex: 'tagList',
    key: 'tagList',
    render: (tagList: string[]) => (
      <>
        {tagList.map(tag => {
          let color = tag.length > 2 ? 'purple' : 'green';
          if (tag.length === 3 || tag.length === 5) {
            color = 'magenta'
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime',
    key: 'publishTime',
    render: (text: string) => {
     return Day.format(text)
    },
    sorter: (a, b) => {
      const aTimes = new Date(a.publishTime).getTime()
      const bTimes = new Date(b.publishTime).getTime()
      return aTimes - bTimes
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (text: string, record) => (
      <Space size="middle">
        <Button type='primary' href='#'>编辑</Button>
        <Button type='primary' danger href={'#'}>删除</Button>
      </Space>
    ),
  },
]

const dataSource: IArticleItem[] = [
  {
    key: '1',
    title: '使用class-validator进行后端数据约束',
    tagList: ['前端', '算法', '工具', 'TypeScript'],
    publishTime: new Date("2020-07-23T02:27:10.017Z")
  },
  {
    key: '2',
    title: 'Vue',
    tagList: ['React', '框架'],
    publishTime: new Date("2020-07-23T02:29:10.017Z")
  },
  {
    key: '3',
    title: 'SCSS',
    tagList: ['前端', 'CSS'],
    publishTime: new Date("2020-07-23T02:28:10.017Z")
  },
]


export default function () {

  return (
    <div>
      <Table dataSource={ dataSource } columns={ columns } />;
    </div>
  )
}