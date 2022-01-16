import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all genres')
  const [allBooks, setAllBooks] = useState([])
  const result = useQuery(ALL_BOOKS)
  if (!show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  let filteredBooks

  const books = result.data.allBooks

  if (allBooks.length === 0) {
    setAllBooks(books)
  }

  const allGenres = books.map(b => b.genres).flat()
  const genres = [...new Set(allGenres)]
  filteredBooks = books

  const setGenreFiltering = (genreClicked) => {
    setGenre(genreClicked)

    if (genreClicked === "all genres") {
      filteredBooks = books
      setAllBooks(filteredBooks)
    } else {
      filteredBooks = books.filter((b) => b.genres.includes(genreClicked))
      setAllBooks(filteredBooks)
    }
  }

  return (
    <div>
      <h2>books</h2>

      <div>in genre <b>{genre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          
          {allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre =>
          <button onClick={() => setGenreFiltering(genre)} key={genre}>
          {genre}
        </button>)}
        <button onClick={() => setGenreFiltering('all genres')}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books