import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Suspense, lazy } from 'react'
import { CreateResume } from './Dashboard/CreateResume/CreateResume'
import { CreateCoverLetter } from './Dashboard/CreateCoverLetter/CreateCoverLetter'
const ResumePage = lazy(() => import( './Resume/ResumePage'))
const CoverLetterPage = lazy(() => import( './CoverLetter/CoverLetterPage'))
const HomePage  = lazy(() => import('./Home/HomePage'))
const DashBoardPage  =  lazy(() => import('./Dashboard/DashBoardPage')) 
const Spinner  = lazy(() => import('./components/ui/Spinner'))

function App() {

  return (
    <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
    <Suspense fallback = {<div className=' flex items-center justify-center h-[100vh]'> <Spinner/> </div>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<HomePage/>}  />
          <Route path='/dashboard' element ={<DashBoardPage/>} />
          <Route 
              path='/dashboard/resume' 
          >
            <Route index 
              element = {<ResumePage/>}  
            />
            <Route path=':id' element = {<CreateResume/>} />
          </Route>
          <Route 
            path='/dashboard/cover-letter' 
          >
            <Route index 
            element = {<CoverLetterPage/>}  
            />
            <Route path=':id' element = {<CreateCoverLetter/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
    </ThemeProvider>
  )
}

export default App
