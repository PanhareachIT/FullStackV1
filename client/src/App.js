
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import NewCate from './page_dashboard/category_dash/CategoryDash';

import LoginPage from './page_dashboard/login/LoginPage';

// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutDashboard from './component/layout/LayoutDashBoard';
import LayoutDashBoardLogin from './component/layout/LayoutDashBoardLogin';

import Layout from './component/layout/Layout';
import HomePage from './page/home/HomePage';
import About from './page/about/About';
import Product from './page/product/Product';
import Category from './page/category/Category';
import CustomerPageDash from './page_dashboard/customer/CustomerPageDash';
import ProductPageDash from './page_dashboard/product_dash/ProductPageDash';
import RegisterPage from './page_dashboard/login/RegisterPage';
import EmployeePageDash from './page_dashboard/employee/EmployeePageDash';
import POS from './page_dashboard/pos/POS';
import OrderDetailDash from './page_dashboard/order_detail/OrderDetailDash';
import OrderDash from './page_dashboard/order_dash/OrderDash';
import CategoryDash from './page_dashboard/category_dash/CategoryDash'
import Role from './page_dashboard/role/Role';
import ProductAlertStock from './page_dashboard/product_dash/ProductAlertStock';
import ImportPageDash from './page_dashboard/import/ImportPageDash';
import SalePageDash from './page_dashboard/sale/SalePageDash';
import { Button } from 'antd';
import RoleCode from './page_dashboard/role/RoleCode';
import Testaa from './page_dashboard/test/Testaa';
import DashboardSaleChart from './page_dashboard/chart/DashboardSaleChart'





function App() {
  // check is has path "dashboard"
  // const is_dashbord = window.location.pathname.includes("dashboard") // true/false
  return (
    // <div className="container mx-auto p-4 text-right bg-gray-50" >
    //   <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello, Tailwind CSS!</h1>
    //   <p className="text-lg text-gray-600">This is a React.js project with Tailwind CSS.</p>
    // </div>
    // <ImportPageDash />
    // <SalePageDash />
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product />} />
          <Route path="category" element={<Category />} />
        </Route>

        <Route path="/dashboard" element={<LayoutDashboard />}>
          {/* <Route path="" element={<HomePage />} /> */}
          <Route path="product/category" element={<CategoryDash />} />
          <Route path="product/product" element={<ProductPageDash />} />
          <Route path="product/productAlert" element={<ProductAlertStock />} />

          <Route path="customer" element={<CustomerPageDash />} />
          <Route path="employee" element={<EmployeePageDash />} />
          <Route path="order" element={<OrderDash />} />
          <Route path="orderDetail" element={<OrderDetailDash />} />
          <Route path="pos" element={<POS />} />
          <Route path="sale" element={<SalePageDash />} />
          <Route path="import" element={<ImportPageDash />} />



          <Route path="user/role" element={<Role />} />
          <Route path="user/role/:role_id" element={<RoleCode />} />

          <Route path="report/saleChart" element={<DashboardSaleChart />} />
        </Route>

        <Route path="/dashboard" element={<LayoutDashBoardLogin />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="testaa" element={<Testaa />} />

        </Route>


      </Routes>
    </BrowserRouter>

    // <div className="container mx-auto p-4">
    //   <h1 className="text-4xl font-bold text-gray-800 mb-4">Tailwind CSS Test</h1>
    //   <p className="text-lg text-gray-600">This is a test page using Tailwind CSS in React.</p>

    // </div>

    // <POS />
    // <ProductPageDash />
    // <OrderDetailDash />


    // <div class="container mx-auto text-right w-full">
    //   <h1 class="text-4xl font-bold text-center mt-8">Welcome to Tailwind CSS</h1>
    //   <p class="text-lg text-gray-700 text-center mt-4">This is a simple example to test Tailwind CSS.</p>
    //   <div class="flex justify-center mt-8">
    //     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //       Click Me
    //     </button>
    //   </div>
    // </div>
    // <OrderDash />
    // <POS />
    // <Role />
    // <OrderDash />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/dashboard/orderDetail/:id' element={<OrderDetailDash />} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App;

