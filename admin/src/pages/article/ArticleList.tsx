import React, { useContext, useEffect } from 'react'
import { Button, Input, message, Popconfirm, Table, Tag } from 'antd'
import Day from '../../utils/Day'
import { ColumnProps, TablePaginationConfig } from 'antd/es/table'
import { Context } from '../../App'
import {
  createDeleteArticleAction,
  createSaveArticleAction,
  createSetLoadingAction,
  createSetSearchConditionAction
} from '../../redux/actions/articleActionCreators'
import ArticleService from '../../services/ArticleService'
import { NavLink } from 'react-router-dom'
import { ISearchCondition } from '../../services/commonTypes'
import { PaginationConfig } from 'antd/es/pagination'
import { IArticleState } from '../../redux/reducers/articleReducer'
import { SearchOutlined } from '@ant-design/icons/lib'

interface IArticleItem {
  key?: string
  _id?: string
  title: string
  tagList: string[]
  publishTime: Date
  content?: string
}

export default function () {

  const { state, dispatch } = useContext(Context)!

  /**
   * 当查询条件改变的时候，重新去请求数据
   * @param searchCondition
   */
  async function getArticles(searchCondition: ISearchCondition) {
    // 获取电影数据
    dispatch(createSetLoadingAction(true))
    dispatch(createSetSearchConditionAction(searchCondition))
    const data = await ArticleService.getArticles(searchCondition)
    dispatch(createSaveArticleAction(data.data, data.total))
    dispatch(createSetLoadingAction(false))
  }

  useEffect(() => {
    getArticles(state.searchCondition)
  }, [])

  function getFilterDropDown(keywordProp: 'title' | 'tagList') {

    return function (p: Object) {
      return (
        <div style={ { padding: 8 } }>
          <Input
            style={ { width: 188, marginBottom: 8, display: 'block' } }
            value={ state.searchCondition.keyword }
            onChange={ (e) => {
              dispatch(createSetSearchConditionAction({ keyword: e.target.value }))
            } }
            onPressEnter={ () => {
              getArticles({ page: 1, keywordProp: keywordProp, keyword: state.searchCondition.keyword })
            } }
          />
          <Button
            type='primary'
            size='small'
            style={ { width: 90, marginRight: 8 } }
            onClick={ () => {
              getArticles({ page: 1, keywordProp: keywordProp, keyword: state.searchCondition.keyword })
            } }
          >
            搜索
          </Button>
          <Button
            size='small'
            style={ { width: 90 } }
            onClick={ () => {
              dispatch(createSetSearchConditionAction({ keyword: '' }))
              getArticles({ page: 1 })
            } }
          >
            重置
          </Button>
        </div>
      )
    }
  }


  const columns: ColumnProps<IArticleItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      filterDropdown: getFilterDropDown('title'),
      filterIcon: <SearchOutlined />
    },
    {
      title: '标签',
      dataIndex: 'tagList',
      key: 'tagList',
      filterDropdown: getFilterDropDown('tagList'),
      filterIcon: <SearchOutlined />,
      render: (tagList: string[]) => (
        <>
          { tagList.map(tag => {
            let color = tag.length > 2 ? 'purple' : 'green'
            if (tag.length === 3 || tag.length === 5) {
              color = 'magenta'
            }
            return (
              <Tag color={ color } key={ tag }>
                { tag }
              </Tag>
            )
          }) }
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
      key: '_id',
      render: (id: string, record) => {
        return (
          <div>
            <NavLink to={ `/movie/edit/${ record._id }` }>
              <Button type='primary'>编辑</Button>
            </NavLink>
            <Popconfirm
              title='确定要删除吗？'
              onConfirm={ async () => {
                dispatch(createSetLoadingAction(true))
                await ArticleService.delete(record._id!)
                dispatch(createDeleteArticleAction(record._id!))
                dispatch(createSetLoadingAction(false))
                await getArticles(state.searchCondition)
                message.success('删除成功')
              } }
              okText='确定'
              cancelText='取消'
            >
              <Button type='primary' danger>删除</Button>
            </Popconfirm>
          </div>

        )
      },
    },
  ]

  function getPageConfig(state: IArticleState): TablePaginationConfig | false {
    if (state.total === 0) return false
    return {
      current: state.searchCondition.page,
      pageSize: state.searchCondition.limit,
      total: state.total,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        getArticles({ limit: pageSize })
      }
    }
  }

  function handleChange(pagination: PaginationConfig, filters: any) {
    getArticles({ page: pagination.current, limit: pagination.pageSize })
  }


  return (
    <Table
      dataSource={ state.data }
      columns={ columns }
      loading={ state.isLoading }
      rowKey="_id"
      pagination={ getPageConfig(state) }
      // @ts-ignore
      onChange={ handleChange }
    />
  )
}