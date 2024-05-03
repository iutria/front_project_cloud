import { NextUIProvider } from "@nextui-org/react"
import RoutesApp from "./routes/RoutesApp"
import { theme } from "./theme/theme"

const App = () => {
  return (
    <NextUIProvider theme={theme}>
      <RoutesApp/>
    </NextUIProvider>
  )
}

export default App
