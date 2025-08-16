import './App.css'
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage'
import SignUpPage from './pages/AuthenticationPage/AuthenticationPage'
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import DashboardSidebar from './Components/DashboardSidebar/DashboardSidebar'
import Homepage from './pages/Homepage/Homepage'
import { useEffect, useState } from 'react'
import { supabase } from './server/supabase-client'
import UnauthorizedPage from './pages/UnauthorizedPage/UnauthorizedPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import EditProductPage from './pages/EditProductPage/EditProductPage'
import CarouselPage from './pages/CarouselPage/CarouselPage'
import OfferPage from './pages/OfferPage/OfferPage'
import CreateProductPage from './pages/CreateProductPage/CreateProductPage'
function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => { 
    const {data, error} = await supabase.from('products').select('*'); 
    if (error) { 
      return;
    } else { 
      setProducts(data);
    }
  }
  useEffect(() => {
    getProducts();
  }, [])

  return (
    <> 
      <Router> 
        <Routes> 
          <Route path='/*' element={<AuthenticationPage /> } />
          <Route path='/dashboard' element={<Homepage products={products}/>} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:product_id' element={<ProductDetailsPage />}/>
          <Route path='/edit/:product_id' element={<EditProductPage />} />
          <Route path='/carousel' element={<CarouselPage />}/>
          <Route path='/offer' element={<OfferPage />}/>
          <Route path='/create-product' element={<CreateProductPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
