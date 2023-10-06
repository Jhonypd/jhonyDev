// import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContext'

//imges
import logo from './images/LOGO_BRANCO.png'

//icons
import { MdDashboardCustomize } from 'react-icons/md'
import { SiAboutdotme } from 'react-icons/si'
import { ImEnter } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'
import { CgLogOut } from 'react-icons/cg'
import { BsFillPostcardHeartFill } from 'react-icons/bs'

//styles
import './Navbar.css'

const Navbar = ({ isExpanded, toggleExpanded }) => {

    const { user } = useAuthValue()

    const { logout } = useAuthentication()

    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <div className={isExpanded ? 'side_nav_container' : 'side_nav_container side_nav_container_NX'} >
            <div className="nav_up">
                <div className="nav_heading">
                    <div className="nav_brand">
                        {isExpanded && (
                            <NavLink to={'/'} >
                                <img src={logo} alt="logo" />

                            </NavLink>
                        )}
                    </div>
                    <button className={
                        isExpanded ? "hamburguer hamburguer_in" : "hamburguer hamburguer_out"}
                        onClick={() => toggleExpanded(!isExpanded)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <div className="nav_menu">

                    <NavLink
                        to={'/'}
                        className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'} ${isActive('/') ? 'active' : ''}`}
                    >
                        <AiFillHome />
                        {isExpanded && <p>Home</p>}
                        {!isExpanded && <div className="tooltip">Home</div>}
                    </NavLink>

                    {!user && (
                        <>
                            {/* <NavLink
                                to={'/login'}
                                className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'} ${isActive('/login') ? 'active' : ''}`}
                            >
                                <ImEnter />
                                {isExpanded && <p>Entrar</p>}
                                {!isExpanded && <div className="tooltip">Entrar</div>}
                            </NavLink> */}

                            {/* <NavLink
                                to={'/register'}
                                className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'}`}
                            >
                                <BiSolidUserPlus />
                                {isExpanded && <p>Cadastrar</p>}
                                {!isExpanded && <div className="tooltip">Cadastrar</div>}
                            </NavLink> */}

                        </>
                    )}

                    {user && (
                        <>
                            <NavLink
                                to={'/posts/create'}
                                className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'} ${isActive('/posts/create') ? 'active' : ''}`}
                            >
                                <BsFillPostcardHeartFill />
                                {isExpanded && <p>Novo post</p>}
                                {!isExpanded && <div className="tooltip">Novo post</div>}
                            </NavLink>

                            <NavLink
                                to={'/dashboard'}
                                className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'} ${isActive('/dashboard') ? 'active' : ''}`}
                            >
                                <MdDashboardCustomize />
                                {isExpanded && <p>Dashboard</p>}
                                {!isExpanded && <div className="tooltip">Dashboard</div>}
                            </NavLink>

                            {/* <NavLink
                                to={'/settings'}
                                className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'} ${isActive('/settings') ? 'active' : ''}`}
                            >
                                <MdOutlineSettingsSuggest />
                                {isExpanded && <p>Ajustes</p>}
                                {!isExpanded && <div className="tooltip">Ajustes</div>}
                            </NavLink> */}
                        </>
                    )}

                    <NavLink
                        to={'/about'}
                        className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'} ${isActive('/about') ? 'active' : ''}`}
                    >
                        <SiAboutdotme />
                        {isExpanded && <p>Sobre</p>}
                        {!isExpanded && <div className="tooltip">Sobre</div>}
                    </NavLink>

                </div>
            </div>
            <div className="nav_footer">
                {user && <>
                    {isExpanded && (<>
                        <div className="nav_details">
                                <img src={user.photoURL} alt={`perfil ${user.displayName}`} />
                        </div>
                        <div className="nav_footer_info">
                            <p className="nav_footer_user_name">{user.displayName}</p>
                        </div>
                    </>
                    )}
                </>}
                {/* {user &&
                    <button onClick={logout}>
                        <CgLogOut className='logout_icon' />
                    </button>
                } */}

                {!user && <>
                    <div className="nav_footer_info">
                        {/* <NavLink
                            to={'/login'}
                            className={`menu_item ${isExpanded ? 'expanded' : 'not-expanded'}`}
                        >
                            <ImEnter />
                            {isExpanded && <p>Fazer login</p>}
                            {!isExpanded && <div className="tooltip">Fazer login</div>}
                        </NavLink> */}
                    </div>
                </>}
            </div>
        </div >
    )
}

export default Navbar