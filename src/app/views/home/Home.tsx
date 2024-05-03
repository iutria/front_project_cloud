import MainContainer from "../../components/main-container/MainContainer"

const Home = ({children}:{children?: any}) => {
  return (
    <MainContainer>
      {children}
    </MainContainer>
  )
}

export default Home
