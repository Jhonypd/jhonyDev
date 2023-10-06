import styles from './EditeProfile.module.css'

import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useEffect, useState } from 'react'
import { useFetchUser } from '../../hooks/useFetchUser'
import { ImSpinner9 } from 'react-icons/im'

const EditeProfile = () => {

    const auth = getAuth();
    const storage = getStorage();

    const { user, error, isLoading: loading } = useFetchUser()

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uid, setUid] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errroProfile, setErrorProfile] = useState('')
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target.result;
                setAvatar(result);
                setPhotoURL(result);
            };
            reader.readAsDataURL(file);
        }
    };




    useEffect(() => {
        if (user !== null) {
            setDisplayName(user.displayName)
            setEmail(user.email)
            setPhotoURL(user.photoURL)
            setUid(user.uid)
            setAvatar(user.photoURL)
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorProfile('')
        setSuccessMessage('')

        try {
            const user = auth.currentUser
            const updates = {}

            if (avatar) {
                const storageRef = ref(storage, `imagens_de_perfil/${user.uid}`)
                const imageAvatar = await fetch(avatar).then((res) => res.blob());
                await uploadBytes(storageRef, imageAvatar);

                //retorno com a url
                const downloadURL = await getDownloadURL(storageRef)

                await updateProfile(user, {
                    photoURL: downloadURL,
                })

            }

            if (displayName !== user.displayName || email !== user.email) {
                updates.displayName = displayName
                updates.email = email
            }
            if (password) {
                if (password === confirmPassword) {
                    await updatePassword(user, password)
                } else {
                    setErrorProfile('As senhas precisam ser iguais')
                    return
                }
            }

            await updateProfile(user, updates)
            setSuccessMessage('Perfil atualizado')
        } catch (error) {
            setErrorProfile(error.message)
            console.log(error.message)
        }

    }


    return (
        <div className={styles.editProfile}>

            {user &&
                <>
                    <h1>Atualizar iformações</h1>
                    <p>Crie seu usuário e compartilhe suas histórias</p>
                    <form onSubmit={handleSubmit}>
                        <label>

                            {user.photoURL || user.photoURL !== null ? (
                                <div>
                                    <img src={user.photoURL} alt={`avatar ${displayName}`} />
                                </div>
                            ) : (
                                user.photoURL && avatar ? (
                                    <div>
                                        <img src={avatar} alt={`avatar ${displayName}`} />
                                    </div>
                                ) : (
                                    avatar ? (
                                        <div>
                                            <img src={avatar} alt={`avatar ${displayName}`} />
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                )
                            )}
                        </label>
                        <label>
                            <span>Foto:</span>
                            <input
                                type="file"
                                name="photURL"
                                accept='image/*'
                                placeholder='Foto do usuário'
                                onChange={handleFileChange}
                            />
                        </label>
                        <label>
                            <span>Nome:</span>
                            <input
                                type="text"
                                name="displaName"
                                required
                                placeholder='Nome do usuário'
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </label>

                        <label>
                            <span>E-mail:</span>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder='E-mail do usuário'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Senha:</span>
                            <input
                                type="password"
                                name="password"
                                
                                placeholder='Insira uma senha'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Confirmar senha:</span>
                            <input
                                type="password"
                                name="confirmPassword"
                                
                                placeholder='Confirme a sua senha'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        {!loading && <button className='btn'>Cadastrar</button>}
                        {loading && <button className='btn' disabled><ImSpinner9 /></button>}
                        {error && <p className='error'>{error}</p>}
                        {successMessage && <p className={styles.success}>{successMessage}</p>}
                    </form>
                </>
            }

        </div>
    )
}

export default EditeProfile