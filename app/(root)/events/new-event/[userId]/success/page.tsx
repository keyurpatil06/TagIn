import React from 'react'

const Success = async ({ params: { userId } }: SearchParamProps) => {
  console.log(userId);


  return (
    <div>
      {userId}
    </div>
  )
}

export default Success
