import React from 'react'

const Server = async () => {

  //simulate a blocking call
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(2000);
    console.log('Server component mounted');
  return (
    <div>Server component</div>
  )
}

export default Server