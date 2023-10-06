import styles from './Profile.module.css'
import { useFetchUser } from '../../hooks/useFetchUser'
import { BsPencilSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Profile = () => {

    const { user, error, isLoading } = useFetchUser()


    if (error) {
        return <p className='error'>Ocorreu algum erro ao carregar os dados!</p>
    }
    if (user) {
        return (

            <div className={styles.profile}>
                <div className={styles.box_info}>
                    <img src={user.photoURL} alt={`foto de ${user.displayName}`} />
                    <Link to={'/editeprofile'} >
                        <BsPencilSquare />
                    </Link>
                </div>
                <p>{user.displayName}</p>
                <p>{user.email}</p>

            </div>
        )
    }
}

export default Profile