
import { Route, Routes } from "react-router-dom";
import InternalServerPage from '../pages/Global/InternalServerPage'








function GlobalRouter() {
  return (
    <div>
        <Routes>
            <Route path='internalServerError' element={<InternalServerPage/>}></Route>
        </Routes>
    </div>
  )
}

export default GlobalRouter
