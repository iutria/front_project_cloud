import NavBar from '../nav-bar/NavBar'
import './styles/main-container.css'

const MainContainer = ({children}:{children: any}) => {
  return (
    <div className='main-container'>
      <NavBar/>
      <div className='container-elements'>
        {children}
      </div>
    </div>
  )
}

export default MainContainer
