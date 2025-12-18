import React, { useEffect, useState } from "react";
import CardCart from "../../../components/Staff/CardCart";
import { useParams } from "react-router-dom";
import { Col, Layout, Row, Typography, Badge, Button, Drawer, Modal, Form, Input, InputNumber } from "antd";
import { PlusCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
    getListMenu,
} from "../../../redux/reducer/modules/ManagerReducer";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import ModalAddMenu from "../../../components/Manager/ListRestaurant/ModalAddMenu";
import CardMenu from "../../../components/Manager/CardMenu";

const { Content } = Layout;
const { Title } = Typography;

export default function Menu() {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const { listMenu } = useSelector((s) => s.manager);
    const [localCart, setLocalCart] = useState([]);
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [itemEdit, setItemEdit]= useState()
    
    // Load menu + cart khi mount
    useEffect(() => {
        if (!restaurantId) return;
        dispatch(getListMenu(restaurantId));
        (async () => {
            try {
                // const res = await dispatch(getCartItems(restaurantId));
                // const payload = res?.payload?.data ?? res?.data;
                // const items = payload?.cartItemsList ?? [];
                // setLocalCart(items.map(normalizeServerCartItem));
            } catch (err) {
                console.error("Lấy cart thất bại", err);
            }
        })();
    }, [restaurantId, dispatch]);

    // Nếu redux cart thay đổi thì sync lại local
   
    // helpers
    const findByMenuId = (menuId) =>
        localCart.find((c) => String(c.menuId) === String(menuId));

    const totalCount = localCart.reduce(
        (s, it) => s + (Number(it.quantity) || 0),
        0
    );

    useEffect(()=>{
        if(itemEdit){
            setOpen(true)
        }
    },[itemEdit])


    return (
        <Layout className="w-100 bg-white">
            {!drawerOpen && (
                <div style={{ position: "fixed", right: 24, top: 100, zIndex: 1200 }}>
                    <Badge count={totalCount} offset={[0, 6]}>
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => setDrawerOpen(true)}
                        />
                    </Badge>
                </div>
            )}

            <Content style={{ padding: '80px 30px' }}>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Title level={2} style={{ textAlign: "center" }}>
                            Danh sách thực đơn
                        </Title>
                    </Col>
                    <Col span={24} className="d-flex justify-content-end">
                        <Button onClick={() => { setOpen(true) }} icon={<PlusCircleOutlined />}>{t('addNew')}</Button>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            {listMenu?.menuList?.map((m) => {
                                const matched = findByMenuId(m._id);
                                const qtyInCart = matched?.quantity ?? undefined;
                                return (
                                    <Col key={m._id} xl={6} lg={8} sm={12} >
                                        <CardMenu item={m} cartQty={qtyInCart} setItemEdit={setItemEdit} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
                {
                    open  && <ModalAddMenu itemEdit={itemEdit} open={open} setOpen={setOpen} />
                }
            </Content>
        </Layout>
    );
}
