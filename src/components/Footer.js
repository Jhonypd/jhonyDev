import { NavLink } from 'react-router-dom'
import { BiLogoReact } from 'react-icons/bi'

import styles from './Footer.module.css'

const Footer = ({ isExpanded }) => {

    
  return (
    <footer className={isExpanded ? styles.footer : `${styles.footer} ${styles.footer_NX}`}>
      <h3>Desenvolvido com muito carinho e <BiLogoReact/></h3>
      <p>
        <NavLink className={styles.link_items} to={'https://github.com/Jhonypd'}>JhonyDev</NavLink> &copy; 2023
      </p>
    </footer>
  )
}

export default Footer