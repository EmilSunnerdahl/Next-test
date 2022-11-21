import Link from 'next/link'
import { server } from '../../../config/index'
import Meta from '../../../components/Meta'
// import { useRouter } from 'next/router'

const article = ({ article }) => {
  // const router = useRouter()
  // const { id } = router.query

  return (
    <>
      <Meta title={article.title} description={article.excerpt} />
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go Back</Link>
    </>
  )
}

// Med den här metoden gör man det static så att allt fetchas "at build time"
export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`)
  const article = await res.json()

  return {
    props: {
      article
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json()

  const ids = articles.map((article) => article.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false
  }
}

// Man kan göra så här istället, men är långsammare eftersom den behöver fetcha varje gång en artikel-sida laddas.
// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   )
//   const article = await res.json()

//   return {
//     props: {
//       article
//     }
//   }
// }

export default article
