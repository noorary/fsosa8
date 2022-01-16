import React from 'react'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommend = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)

  if (!show) {
    return null
  }

  if (result.loading || userResult.loading)  {
    return <div>loading...</div>
  }

  const currentUser = userResult.data
  const favoriteGenre = currentUser.me.favoriteGenre
  console.log(favoriteGenre)

  const books = result.data.allBooks
  const filteredBooks = books.filter((b) => b.genres.includes(favoriteGenre))


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{favoriteGenre}</b></p>
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
          
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    
  )
}

export default Recommend