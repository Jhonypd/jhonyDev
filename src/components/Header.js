import styles from './Header.module.css'

import { NavLink, Link } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContext'

//import { useFetchUser } from '../hooks/useFetchUser'

//icons
import { CgLogOut } from 'react-icons/cg'
import { MdOutlineSettingsSuggest } from 'react-icons/md'
import { BsFillFilePersonFill } from 'react-icons/bs'

const Header = ({ isExpanded, popUp, infProfile }) => {

    

    const { user } = useAuthValue()

    const { logout } = useAuthentication()



    return (
        <div className={isExpanded ? styles.header : `${styles.header} ${styles.header_NX}`}>
            <ul>
                {!user && (
                    <>
                        <li>
                            <NavLink className={styles.active} to={'/register'} >
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.active} to={'/login'} >
                                Login
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li className={styles.header_profile}>
                            <button
                                className={infProfile ? styles.header_btn : `${styles.header_btn} ${styles.header_btn_active}`}
                                onClick={() => popUp(!infProfile)}  >
                                <BsFillFilePersonFill />
                            </button>
                            <div className={infProfile ? styles.header_profile_inf : `${styles.header_profile_inf} ${styles.header_profile_inf_not}`}>

                                {user.photoURL !== null &&
                                    <img src={user.photoURL} alt="admin" />
                                }
                                <p className={styles.header_name}>
                                    <Link to={'/profile'}>
                                        {user.displayName}
                                    </Link>
                                </p>
                                <button onClick={logout}>
                                    <CgLogOut className={styles.logout} />
                                </button>
                            </div>
                        </li>
                        <li className={styles.header_setings}>
                            <NavLink
                                className={styles.active}
                                to={'/settings'}
                            >
                                <MdOutlineSettingsSuggest />
                                {!isExpanded && <div className="tooltip">Ajustes</div>}
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Header