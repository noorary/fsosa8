import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS)
  console.log(result)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: {name, born: parseInt(born) } })

    setName('')
    setBorn('')
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
            <div>
              name
              <input
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div>
              born
              <input 
                value={born}
                onChange={({ target }) => setBorn(target.value)}
                />
            </div>
            <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors