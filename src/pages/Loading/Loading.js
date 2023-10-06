import styles from './Loading.module.css'

//icons
import { ImSpinner9 } from 'react-icons/im'

const Loading = () => {
  return (
    <div className={styles.loading_box}>
        <div className={styles.box}>
            <ImSpinner9 className={styles.loading_animation} />
        </div>
    </div>
  )
}

export default Loading