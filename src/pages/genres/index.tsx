import GenreList from '@/components/GenreList'
import { Box, Container, Heading, Select } from '@chakra-ui/react'
import useGetGenres from '@/hooks/useGetGenres'
import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '@/components/Layout'
import Error from '@/components/Error'
import Loading from '@/components/Loading'

const CategoriesIndexPage: React.FC = () => {
  const [value, setValue] = useState<'movie' | 'tv'>('movie')
  const { data, status, error } = useGetGenres(value)

  function handleChange(e) {
    setValue(e.target.value)
  }
  return (
    <Layout>
      <Head>
        <title>Genres | Aflix</title>
      </Head>
      <Box minHeight="100vh" pt={'55px'}>
        <Box margin="0 5%"mt={8}>
          <Heading mb={2} size="lg">
            Gendres
          </Heading>
          <Select mb={[4, 8]} value={value} variant="filled" onChange={handleChange}>
            <option value="movie">Movie</option>
            <option value="tv">TV Series</option>
          </Select>
          {status === 'loading' ? (
            <Loading />
          ) : status === 'error' ? (
            <Error message={(error as any).name} description={(error as any).message} />
          ) : (
            <GenreList genres={data} mediaType={value} />
          )}
        </Box>
      </Box>
    </Layout>
  )
}
export default CategoriesIndexPage
