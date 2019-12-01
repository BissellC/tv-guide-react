import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowInfo = props => {
  console.log(props.show)
  const [showData, setShowData] = useState()
  const [castData, setCastData] = useState()
  const getShowData = async () => {
    const showResp = await axios.get(
      `https://api.themoviedb.org/3/tv/${props.show}?api_key=0e8aba4bfd1f0badefbdd05a4949c889&language=en-US&page=1`
    )
    setShowData(showResp)
    console.log(showResp.name)
  }

  const getCastData = async () => {
    const castResp = await axios.get(
      `https://api.themoviedb.org/3/tv/${props.show}/credits?api_key=0e8aba4bfd1f0badefbdd05a4949c889&language=en-US`
    )
    console.log(castResp.data)
    setCastData(castResp.cast)
  }

  useEffect(() => {
    console.log('using the effect')
    getShowData()
    getCastData()
  }, [])

  return (
    <>
      <section className="ShowInfo">
        <h1 className="ShowTitle">{showData.title}</h1>
        <img className="ShowPoster" src={showData.poster_path}></img>
        <h2 className="AirDate">{showData.first_air_date}</h2>
        <p className="ShowOverview">{showData.overview}</p>
      </section>
      )
    </>
  )
}
export default ShowInfo