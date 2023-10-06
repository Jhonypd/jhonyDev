//styles
import styles from './Home.module.css'

//hooks
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

//icons
import { HiDocumentSearch } from 'react-icons/hi'

// pages
import Loading from '../Loading/Loading'

//components
import PostDetail from '../../components/PostDetail'


const Home = () => {

  const [query, setQuery] = useState('')
  const { documents: posts, loading } = useFetchDocuments('posts')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <label>
          <input type="text" placeholder="Ou busque por tags" onChange={(e) => setQuery(e.target.value)} />
          <button className='btn btn-dark'> <HiDocumentSearch /> </button>
        </label>
      </form>
      <div className={styles.box_posts}>
        {loading && <Loading/>}
        {posts && posts.map((post) => 
          <PostDetail key={post.id} post={post} />
        )}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link className='btn' to={'/posts/create'}>
              Crie seu primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home