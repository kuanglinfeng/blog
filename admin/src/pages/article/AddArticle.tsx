import React from 'react'
import EditTagGroup from '../../components/EditTagGroup'

export default function () {

  function onAdd(tags: string[]) {
    console.log(tags)
  }

  return (
    <div>
      标签：<EditTagGroup onAddTags={onAdd} />
    </div>
  )
}