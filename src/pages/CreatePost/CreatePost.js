import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
// import { storage } from '../../firebase/config'

import { ImSpinner9 } from 'react-icons/im'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [img, setImg] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')
  //const [imgUrl, setImgUrl] = useState('')
  //const [progress, setProgress] = useState(0)
  const [previewImage, setPreviewImage] = useState(null);


  const { insertDocument, response } = useInsertDocument('posts')

  const navigate = useNavigate()

  const { user } = useAuthValue()

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError('')

    // validade image url
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser um URL.")
    }

    //image
    const file = e.target[0]?.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }

    //const storageRef = ref(storage, `images/${file.name}`)
    // const uploadTask = uploadBytesResumable(storageRef, file)

    // uploadTask.on(
    //   "state_changed",
    //   snapshot => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     setProgress(progress)
    //   },

    //   error => {
    //     console.log(error)
    //   },

    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then(url => {
    //       setImgUrl(url)
    //     })
    //   }
    // )
    //criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if (!title || !image || !img || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!')
    }

    if (formError) return;


    insertDocument({
      title,
      image,
      img,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //redirect to home page

    navigate('/')
  }



  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser, compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            value={title}
            placeholder='Pense em um bom título...'
            required
            onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            value={image}
            placeholder='Insira um imagem que represente seu post'
            required
            onChange={(e) => setImage(e.target.value)} />
        </label>

        <label>
          <span>imagem:</span>
          <input
            type="file"
            name="img"
            accept="image/*" // Para garantir que apenas arquivos de imagem sejam selecionados
            required
            onChange={(e) => {
              setImg(e.target.value);
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setPreviewImage(event.target.result);
                };
                reader.readAsDataURL(file);
              } else {
                setPreviewImage(null); // Limpa a pré-visualização se o usuário remover a seleção
              }
            }}
          />
          {previewImage && (
            <div className={styles.container_img}>
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </label>


        <label>
          <span>Conteúdo:</span>
          <textarea
            type="textarea"
            name="conteudo"
            value={body}
            placeholder='Insira o conteúdo do post...'
            required
            onChange={(e) => setBody(e.target.value)} ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            value={tags}
            placeholder='Insira as tags separadas por vrgula...'
            required
            onChange={(e) => setTags(e.target.value)} />
        </label>


        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading &&
          <button className='btn' disabled>
            <ImSpinner9 className={styles.loading_btn} />
          </button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost