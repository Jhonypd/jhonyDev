import styles from './post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

//pages
import Loading from '../Loading/Loading'

const Post = () => {
    const { id } = useParams()
    const { loading, document: post } = useFetchDocument('posts', id)

    return (
        <div className={styles.post_container}>
            {loading && <Loading />}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <div className={styles.text}>
                        <p>{post.body}</p>
                    </div>
                    <h3>Eete post trata sobre:</h3>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Post