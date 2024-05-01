import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './pages/ProductForm';
import Layout from './components/Layout';
import CategoryList from './components/CategoryList';
import CategoryForm from './pages/CategoryForm';
import { useSelector } from 'react-redux';

function App() {

  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Dashboard />} /> */}
          <Route path="/" element={ <Layout />}>
            <Route path="/products" element={currentUser && <ProductList />} />
            <Route path="/categories" element={currentUser && <CategoryList />} />
          </Route>
          <Route exact path='/product' element={currentUser && <ProductForm />} />
          <Route exact path='/category' element={currentUser && <CategoryForm />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
