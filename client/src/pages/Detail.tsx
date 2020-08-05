import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

interface IParams {
  id: string
}

export default function () {
  const { id } = useParams<IParams>()

  return (
    <div>
      {id}
    </div>
  )
}