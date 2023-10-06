//styles
import styles from './Dashboard.module.css'

//icons
import { MdDeleteForever } from 'react-icons/md'
import { BsPencilFill } from 'react-icons/bs'
import { GrView } from 'react-icons/gr'

import { Link } from 'react-router-dom'

//hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

//pages
import Loading from '../Loading/Loading'

const Dashboard = () => {

  const { user } = useAuthValue()
  const uid = user.uid

  const { documents: posts, loading } = useFetchDocuments('posts', null, uid)

  const { deleteDocument } = useDeleteDocument('posts')


  if (loading) {
    return <Loading />
  }


  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to='/posts/create' className='btn'>
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts && posts.map((post) => <div key={post.id} className={styles.post_row}>
            <p>{post.title}</p>
            <div className={styles.box_btn}>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>
                <GrView/>
              </Link>
              <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>
                <BsPencilFill/>
              </Link>
              <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>
                <MdDeleteForever/>
              </button>
            </div>
          </div>)}
        </>
      )}
    </div>

  )
}

export default Dashboard