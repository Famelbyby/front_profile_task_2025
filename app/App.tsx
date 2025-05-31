import type React from 'react'
import TablePage from '../pages/TablePage/TablePage'
import { store } from './store'
import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TablePage />
    </Provider>
  )
}

export default App
