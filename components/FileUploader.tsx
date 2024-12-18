'use client'

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUploaderProps = {
  files: File[] | undefined,
  onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt='uploaded image'
          width={1000}
          height={1000}
          className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
          <Image
            src='/upload.svg'
            width={40}
            height={40}
            alt='upload'
          />
          <div className="flex flex-col justify-center gap-2 text-center text-slate-500">
            <p className="text-base">
              <span className="text-red-500">Click to upload</span> or drag and drop
            </p>
            <p>SVG, PNG, JPG OR Gif (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  )
}

export default FileUploader