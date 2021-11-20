import React, { useEffect } from 'react'

import { loadPeople, selectPeople } from 'src/store/reducers/peopleStore'
import { useAppDispatch, useAppSelector } from 'src/store/hook'
import Layout from 'src/components/Layout'

const People = () => {
  const dispatch = useAppDispatch()
  const people = useAppSelector(selectPeople)

  useEffect(() => {
    dispatch(loadPeople())
  }, [])

  return (
    <Layout>
      <h1>People</h1>
    </Layout>
  );
}

export default People
