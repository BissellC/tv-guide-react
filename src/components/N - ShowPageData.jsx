import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ShowInfo = props => {
  console.log(props.show)
  const [showData, setShowData] = useState('')
  const [castData, setCastData] = useState([])
  const getShowData = async () => {
    const showResp = await axios.get(
      `https://api.themoviedb.org/3/tv/${props.show}?api_key=0e8aba4bfd1f0badefbdd05a4949c889&language=en-US&page=1`
    )
    setShowData(showResp.data)
    console.log(showResp.data)
  }
  const getCastData = async () => {
    const castResp = await axios.get(
      `https://api.themoviedb.org/3/tv/${props.show}/credits?api_key=0e8aba4bfd1f0badefbdd05a4949c889&language=en-US`
    )
    console.log(castResp.data.cast)
    setCastData(castResp.data.cast)
  }
  useEffect(() => {
    console.log('using the effect')
    getShowData()
  }, [])
  useEffect(() => {
    console.log('using the effect')
    getCastData()
  }, [])
  return (
    <>
      <section className="ShowInfo">
        <img
          className="ShowPoster"
          src={`https://image.tmdb.org/t/p/w500${showData.poster_path}`}
        ></img>
        <section className="showTitle">
          <h2>{showData.name}</h2>
          <p className="AirDate">{showData.first_air_date}</p>
          <hr></hr>
          <p className="ShowOverview">{showData.overview}</p>
        </section>
      </section>
      <section className="CastInfo">
        <ul>
          {castData.map(member => {
            return (
              <div>
                <img
                  className="CastImage"
                  src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                ></img>
                <p className="CharacterInfo">Character: {member.character}</p>
                <Link className="link" to={'/CastPage/' + member.id}>
                  Actor: {member.name}
                </Link>
              </div>
            )
          })}
        </ul>
      </section>
    </>
  )
}
export default ShowInfo
