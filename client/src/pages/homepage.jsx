// import { useState } from 'react';
import Collection from '../components/collection/Collection'
import '../App.css'

function HomePage() {
  const collectionList = [
    {title: 'Summer Days', description: 'Discover the Summer Collection', collection: 'summer'},
    {title: 'Sweater Weather', description: 'Fall Into Style', collection: 'fall'},
    {title: 'Cozy up in style', description: 'Shop the Winter Collection', collection: 'winter'}
  ]

  return (
    <>
      <Collection collections={collectionList} />
    </>
  )
}

export default HomePage
