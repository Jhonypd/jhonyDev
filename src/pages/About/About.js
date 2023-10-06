import styles from './About.module.css'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Jhony<span>D</span><p>ev</p></h2>
      <p>Este projeto consiste em um blog feito com <Link to={'https://pt-br.react.dev/'}>React</Link> no front-end e <Link to={'https://firebase.google.com/?hl=pt'}>Firebase</Link> no back-end, criado com o propósito de colocar em prática meu aprendizado em <Link to={'https://pt-br.react.dev/'}>React</Link></p>
      <p>Seja muito bem-vindo ao <strong>JhonyDev</strong>, o espaço onde compartilho minha apaixonante jornada como programador <strong>front-end</strong>. Aqui, você encontrará relatos pessoais sobre minha trajetória no mundo do desenvolvimento web, nesse momento com ênfase especial em tudo o que envolve o <strong>React</strong>. À medida que me aprofundo nas complexidades do código e navego pelo vasto oceano da programação, estou entusiasmado em compartilhar meus progressos, descobertas e desafios com você.</p>
      <Link to='/posts/create' className='btn'>
        Criar post
      </Link>
    </div>
  )
}

export default About