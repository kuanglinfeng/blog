import React, { useEffect, useState } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/es/upload/interface'
import axios from 'axios'

const uploadUrl = 'http://localhost:3000/upload'

export default () => {

  const [files, setFiles] = useState<UploadFile[]>([])

  const getFiles = async () => {
    const result = await axios.get('/api/upload')
    const arr: UploadFile[] = []
    result.data.data.forEach((fileName: string) => {
      arr.push({
        uid: fileName.split('.')[0],
        name: fileName,
        status: 'done',
        thumbUrl: `${uploadUrl}/${fileName}`,
        url: `${uploadUrl}/${fileName}`,
      } as UploadFile)
    })
    setFiles(arr)
  }

  useEffect(() => {
    getFiles()
  }, [])

  const onChange = async () => {
    await getFiles()
  }

  const onRemove = async (file: UploadFile) => {
    const result = await axios.delete('/api/upload/' + file.name)
    if (result.data.data.error) {
      message.error(result.data.data.error)
    } else {
      message.success('删除成功')
    }
    await getFiles()
  }

  return (
    <>
      <Upload
        action="/api/upload"
        name="imageFile"
        listType="picture"
        accept=".jpeg,.jpg,.png,.gif"
        className="upload-list-inline"
        fileList={files}
        onChange={onChange}
        onRemove={onRemove}
      >
        <Button icon={ <UploadOutlined /> }>上传图片</Button>
      </Upload>
    </>
  )
}