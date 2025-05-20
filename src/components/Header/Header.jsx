import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Logo, LogoutBtn, Container } from '../index'


const Header = () => {


  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
  ]


  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Logo />
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item, index) => (
                item.active && 
                    <li key={index}>
                      <button 
                          className='px-6 py-2 duration-200 hover:bg-blue-100 
                              rounded-full cursor-pointer'
                          onClick={navigate(item.slug)}
                      >
                          {item.name}
                      </button>
                    </li>
              ))
            }

            {
              authStatus && 
              <li>
                <LogoutBtn />
              </li>
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header