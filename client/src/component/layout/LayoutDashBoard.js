
import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  BarcodeOutlined,
  BellOutlined,

  DollarOutlined,

  FileTextOutlined,
  MenuOutlined,
  NotificationFilled,
  PieChartOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import meImage from '../../assets/logo/me.jpg';
import { Outlet, useNavigate } from "react-router-dom"
import { Avatar, Badge, Breadcrumb, Button, Dropdown, Image, Input, Layout, Menu, Space, theme } from 'antd';
import { getUser, isNullorEmply } from '../../share/help';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),

  getItem('Customer', '/dashboard/customer', <TeamOutlined />),
  getItem('Employee', '/dashboard/employee', <UserOutlined />),
  getItem('Order', '/dashboard/order', <ShoppingOutlined />),
  // getItem('OrderDetail', '/dashboard/orderDetail', <FileTextOutlined />),
  getItem('POS', '/dashboard/pos', <ShopOutlined />),
  getItem('Sale', '/dashboard/sale', <DollarOutlined />),
  getItem('Import', '/dashboard/import', <UploadOutlined />),


  getItem('Product', '/dashboard/product', <MenuOutlined />, [
    getItem('Category', '/dashboard/product/category', <AppstoreOutlined />),
    getItem('Product', '/dashboard/product/product', <BarcodeOutlined />),
    getItem('ProductAlertStock', '/dashboard/product/productAlert', <BellOutlined />),
  ]),

  getItem('User', '', <UserOutlined />, [
    getItem('Role', '/dashboard/user/role', <UsergroupAddOutlined />),
    // getItem('User role', '/dashboard/user/userrole', <UsergroupAddOutlined />),
  ]),

  getItem('System', '/dashboard/system', <SettingOutlined />, [
    getItem('Order Status', '/dashboard/system/orderstatus'),
    getItem('Order Payment', '/dashboard/system/orderpayment'),
    getItem('Province', '/dashboard/system/province'),
  ]),

  getItem('Report', '/dashboard/report', <FileTextOutlined />, [
    getItem('Top sale', '/dashboard/report/topsale'),
    getItem('Sale summary', '/dashboard/report/salesummary'),
    getItem('Sold by catgory', '/dashboard/report/soldbycategory'),
    // getItem('Sold by product', '/dashboard/report/soldbyproduct'),
    getItem('Sale Chart', '/dashboard/report/saleChart'),
  ]),
];

const LayoutDashboard = () => {
  console.log(items.key)
  document.title = "Dashboard"
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin")
    console.log(isLogin)
    if (isNullorEmply(isLogin) || isLogin === 0) { // not yet login
      localStorage.clear()
      navigate("/dashboard/login")  // if not yet login

      // handleLogout();
    }
  }, [])



  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onChangeMenu = (item) => {
    console.log(item.key)
    navigate(item.key)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/dashboard/login"
    // navigate("/dashboard/employee")
  }

  const itemsProfile = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          My Account
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Chnage password
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Address
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a href="/" onClick={handleLogout}>
          Logout
        </a>
      ),
    },
  ];

  const user = getUser();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu onSelect={(value) => onChangeMenu(value)} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 10px",
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            // marginBottom: '50px',
            height: '70px'
          }}
        >
          <div className="brandContain" >
            <img
              src={meImage}
              alt=''
              style={{ width: 60, height: 60, marginRight: 10, marginLeft: 10 }}
            />
          </div>

          <div>
            <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <Badge count={4} >
                <Avatar shape="square" size="small" />
              </Badge>
              <Badge count={2} >
                <NotificationFilled style={{ fontSize: 24, marginLeft: 10 }} />
              </Badge>
              <Dropdown
                menu={{
                  items: itemsProfile,
                }}
              // placement="bottomRight"
              // arrow
              >
                <Button style={{ marginLeft: 10 }}>{user.firstname + "-" + user.lastname}</Button>
              </Dropdown>
            </Space>
          </div>
        </Header>
        {/* <div className='titlePageDashBoard'><h1>ReactJs With NoteJs</h1></div> */}
        <Content
          style={{
            margin: '16px 16px',
          }}
        >
          <div
            style={{
              padding: 5,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Powered By NIT © 2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutDashboard;