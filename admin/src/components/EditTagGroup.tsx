import { Tag, Input, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'

interface IState {
  tagList: string[]
  inputVisible: boolean
  inputValue: string
  editInputIndex: number
  editInputValue: string
}

interface IProps {
  value?: string[]
  onChange?: (tagList: string[]) => void
}

function EditTagGroup(props: IProps) {

  const [state, setState] = useState({
    tagList: [],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  } as IState)

  let input = useRef<Input>(null)
  let editInput = useRef<Input>(null)

  const handleClose = (removedTag: string) => {
    const tagList = state.tagList.filter(tag => tag !== removedTag)
    setState({ ...state, tagList: tagList })
  }

  const showInput = () => {
    setState({ ...state, inputVisible: true })
  }

  useEffect(() => {
    if (props && props.value) {
      setState({ ...state, tagList: props.value })
    }
  }, [props.value])


  useEffect(() => {
    if (state.inputVisible) {
      input && input.current && input.current.focus()
    }
  }, [state.inputVisible])

  useEffect(() => {
    if (state.editInputIndex !== -1) {
      editInput && editInput.current && editInput.current.focus()
    }
  }, [state.editInputIndex])

  useEffect(() => {
    // 抛给父组件
    props.onChange!(state.tagList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tagList])

  const handleInputChange = (e: any) => {
    setState({ ...state, inputValue: e.target.value })
  }

  const handleInputConfirm = () => {
    const { inputValue } = state
    let { tagList } = state
    if (inputValue && tagList.indexOf(inputValue) === -1) {
      tagList = [...tagList, inputValue]
    }
    setState({
      ...state,
      tagList: tagList,
      inputVisible: false,
      inputValue: '',
    })
  }

  const handleEditInputChange = (e: any) => {
    setState({ ...state, editInputValue: e.target.value })
  }

  const handleEditInputConfirm = () => {
    const newTags = [...state.tagList]
    if (newTags.indexOf(state.editInputValue) === -1) {
      newTags[state.editInputIndex] = state.editInputValue
    }
    setState({ ...state, tagList: newTags, editInputIndex: -1, editInputValue: '' })
  }

  const { tagList, inputVisible, inputValue, editInputIndex, editInputValue } = state

  return (
    <div className='tagGroup'>
      { tagList.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={ editInput }
              key={ tag }
              size="small"
              className="tag-input"
              value={ editInputValue }
              onChange={ handleEditInputChange }
              onBlur={ handleEditInputConfirm }
              onPressEnter={ handleEditInputConfirm }
            />
          )
        }

        const isLongTag = tag.length > 20

        const tagElem = (
          <Tag
            className="edit-tag"
            key={ tag }
            closable={ index !== -1 }
            onClose={ () => handleClose(tag) }
          >
              <span
                onDoubleClick={ e => {
                  if (index !== -1) {
                    setState({ ...state, editInputIndex: index, editInputValue: tag })
                    e.preventDefault()
                  }
                } }
              >
                { isLongTag ? `${ tag.slice(0, 20) }...` : tag }
              </span>
          </Tag>
        )

        return isLongTag ? (
          <Tooltip title={ tag } key={ tag }>
            { tagElem }
          </Tooltip>
        ) : (
          tagElem
        )
      }) }
      {
        inputVisible && (
          <Input
            ref={ input }
            type="text"
            size="small"
            className="tag-input"
            value={ inputValue }
            onChange={ handleInputChange }
            onBlur={ handleInputConfirm }
            onPressEnter={ handleInputConfirm }
          />
        )
      }
      {
        !inputVisible && (
          <Tag className="site-tag-plus" onClick={ showInput }>
            <PlusOutlined /> 新增标签
          </Tag>
        )
      }
    </div>
  )
}

export default EditTagGroup
