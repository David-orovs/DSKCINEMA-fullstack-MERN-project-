import React from 'react'
import { Descriptions, Badge } from 'antd';
import './movieinfo.css'

function MovieInfo(props) {

    const { movie } = props;
    
    return (
      <div style={{width:'80%', margin: '0 auto'}}>
 

<h2>Styling Tables</h2>

<table style={{background: 'white', width:'100%', borderRadius: '10px'}}>
  <tr style={{background: 'red'}}>
    <th>Title</th>
    <th>Runtime</th> 
    <th>Vote_Count</th>
  </tr>
  <tr>
    <td>{movie.original_title}</td>
    <td>{movie.runtime}</td>
    <td>{movie.vote_count}</td>
  </tr>
  <tr style={{background: 'pink'}}>
    <th>Release_Date</th>
    <th>Vote_Average</th>
    <th>Revenue</th>
  </tr>
  <tr>
    <td>{movie.release_date}</td>
    <td>{movie.vote_count}</td>
    <td>{movie.revenue}</td>
  </tr>
</table>

      </div>
      // {/* //   <Descriptions title="Movie Info" bordered>
      // //   <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
      // //   <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
      // //   <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
      // //   <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
      // //   <Descriptions.Item label="vote_average" span={2}>
      // //   {movie.vote_average}
      // //   </Descriptions.Item>
      // //   <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
      // //   <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
      // //   <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
      // // </Descriptions> */}
    )
}

export default MovieInfo
