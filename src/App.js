import { useReducer, useState } from 'react'
import { reducer } from './reducer'
import axios from 'axios'

import './App.css'

const initialState = {
  data: '',
  loading: false,
  error: '',
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { data, loading, error } = state

  const randomPic = () => {
    dispatch({ type: 'FETCH_START' })

    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.data)
      .then((response) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.message })
      })
      .catch(() => {
        dispatch({ type: 'FETCH_ERROR', payload: 'Load error!' })
      })
  }
  return (
    <div className="App">
      <button onClick={randomPic} disabled={loading}>
        Random Pic
      </button>
      {data && (
        <div>
          <img src={data} alt="random pic" />
          <h1>{data}</h1>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default App
