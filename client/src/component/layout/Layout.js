
// import nit_image from "../../assets/logo/nit.jpeg"
import './Layout.css'

import { Outlet, useNavigate } from "react-router-dom"
import { Col, Row, Space } from "antd"
// import { BsAndroid2, BsApple, BsFacebook, BsYoutube, BsTiktok, BsTelegram } from "react-icons/bs"

function Layout() {

    const navigate = useNavigate()
    const onClickMenu = (routeName) => {
        navigate(routeName)
    }

    // const dataFollow = [
    //     {
    //         name: "Faceboox",
    //         icon: <BsFacebook className="iconNormal" />,
    //         link: "https://www.facebook.com/"
    //     },
    //     {
    //         name: "Youtube",
    //         icon: <BsYoutube className="iconNormal" />,
    //         link: "https://www.youtube.com/"
    //     },
    //     {
    //         name: "Tik tok",
    //         icon: <BsTiktok className="iconNormal" />,
    //         link: "https://www.tiktok.com/login"
    //     },
    //     {
    //         name: "Telegram",
    //         icon: <BsTelegram className="iconNormal" />,
    //         link: "https://www.tiktok.com/login"
    //     }
    // ]

    return (
        <div>
            <div className="mainHeader" style={{ position: "fixed", width: "100%" }}>
                <div className="brandContain" onClick={() => onClickMenu("/")}>
                    {/* <img 
                        src={nit_image} 
                        className="logo"
                    /> */}
                    <div>
                        <div className="txtBrand">Reach's Project</div>
                    </div>
                </div>
                <div className="menuContain">
                    <ul className="menu">
                        <li onClick={() => onClickMenu("/")} className="menuItem">Home</li>
                        <li onClick={() => onClickMenu("/about")} className="menuItem">About</li>
                        <li onClick={() => onClickMenu("/product")} className="menuItem">Produt</li>
                        <li onClick={() => onClickMenu("/cateogry")} className="menuItem">Cateogry</li>
                        <li onClick={() => onClickMenu("/dashboard/login")} className="menuItem">Login</li>
                        <li onClick={() => onClickMenu("/dashboard")} className="menuItem">To Backend</li>
                    </ul>
                </div>
            </div>

            <Outlet />

            <div style={{ marginTop: 20, backgroundColor: '#FFE4C4', padding: '50px 10%' }}>
                {/* <Row>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} style={{ padding: 20 }}>
                        <img
                            // src={nit_image}
                            alt=""
                            width={130}
                            height={130}
                        />
                        <div className="textTitle">NIT Cambodia</div>
                        <div>New Information Technogy</div>
                        <div>Build IT Skill</div>
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 8 }} style={{ padding: 20 }}>
                        <div className="textTitle">NIT APP</div>
                        <a rel="noreferrer" href="https://play.google.com/store/search?q=zara&c=apps&hl=en&gl=US" target="_blank">
                            <Space>
                                <BsAndroid2 className="iconNormal" /><div className="textNormal">Android App</div>
                            </Space>
                        </a>
                        <br />
                        <a rel="noreferrer" href="https://play.google.com/store/search?q=zara&c=apps&hl=en&gl=US" target="_blank">
                            <Space>
                                <BsApple className="iconNormal" /><div className="textNormal">IOS App</div>
                            </Space>
                        </a>
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 8 }} style={{ padding: 20 }}>
                        <div>
                            <div className="textTitle">Follow US</div>
                            {dataFollow.map((item, index) => {
                                return (
                                    <div>
                                        <a rel="noreferrer" key={index} href={item.link} target="_blank">
                                            <Space>
                                                {item.icon}<div className="textNormal">{item.name}</div>
                                            </Space>
                                        </a>
                                        <br />
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row> */}
            </div>

            <div style={{ textAlign: 'center', padding: 5 }}>© 2023, Reach's Project By Using Reactjs & NodeJs.</div>
        </div>
    )
}

export default Layout;