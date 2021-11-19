import React, { useEffect } from 'react'

import { loadPeople, selectPeople } from 'src/store/reducers/peopleStore'
import { useAppDispatch, useAppSelector } from 'src/store/hook'

function App() {
  const dispatch = useAppDispatch()
  const people = useAppSelector(selectPeople)

  useEffect(() => {
    dispatch(loadPeople())
  }, [])

  if (people.status === 'loading') {
    return <div>Loding</div>
  }

  if (people.status === 'failed') {
    return <div>Error</div>
  }

  return (
    <div className="App">
      {people.data.results.map((person) => {
        return (<div>{person.name}</div>)
      })}
    </div>
  );
}

export default App;
