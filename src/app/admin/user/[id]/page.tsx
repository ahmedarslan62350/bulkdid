import React from 'react'

const page = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  return (
    <div>{(await params).id}</div>
  )
}

export default page