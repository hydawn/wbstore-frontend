import { useEffect, useState } from "react"
import axios from 'axios';

import LoadingPage from '../LoadingPage';

interface OrderInfo {
  id: string,
  // username
  username: string,
  user_id: string,
  merchandise_id: string,
  count: number,
  total_price: number,
  status_paid: boolean,
  status_taken: boolean,
  status_cancelling: boolean,
  added_date: string
}

interface OrderInfoDisplayProp {
  orderInfoData: OrderInfo,
}

interface OrderInfoProp {
  orderInfoData: OrderInfo,
  setOrderInfoData: Function
}

interface OrderIdProp {
  orderId: string,
  setFocusOrderId: Function
}

function OrderInfoDisplay({orderInfoData}: OrderInfoDisplayProp) {
  return (<>
    order {orderInfoData.id} made by user {orderInfoData.username},
    count {orderInfoData.count},
    price: {orderInfoData.total_price},
    paid: {orderInfoData.status_paid ? 'yes' : 'no'},
    taken: {orderInfoData.status_taken ? 'yes' : 'no'},
    cancelling: {orderInfoData.status_cancelling ? 'yes' : 'no'},
    added_date: {orderInfoData.added_date}
  </>);
}

async function getOrderData(orderId: string, setOrderInfoData: Function) {
  console.log('getting ', orderId)
  await axios.get(
    '/api/get_order',
    {params: {runningorder_id: orderId}}).then(resp => {
    console.log('got order info:', resp);
    const order_info = resp.data.data as OrderInfo;
    setOrderInfoData(order_info);
  }).catch(resp => {
    console.error('failed to get order:', resp)
  });
}

function OrderActions({orderInfoData, setOrderInfoData}: OrderInfoProp) {
  async function cancelOrder() {
    console.log(`cancel order ${orderInfoData.id}`)
    await axios.post(
      '/api/customer_change_order',
      { action: 'cancel', runningorder_id: orderInfoData.id }
    ).then(resp => {
      console.log('got resp:', resp);
      // reload it
      getOrderData(orderInfoData.id, setOrderInfoData);
    }).catch(
      resp => { console.error('got error:', resp); }
    );
  }

  async function payOrder() {
    console.log(`mocking paying ${orderInfoData.id}`);
    await axios.post(
      '/api/customer_change_order',
      { action: 'pay', runningorder_id: orderInfoData.id }
    ).then(resp => {
      console.log('got resp:', resp);
      getOrderData(orderInfoData.id, setOrderInfoData);
    }).catch(
      resp => { console.error('got error:', resp); }
    );
  }

  function PayOrder() {
    if (orderInfoData.status_paid)
      return <button className="btn btn-secondary">已付款</button>;
    else
      return <button className="btn btn-primary" onClick={() => {payOrder()}}>付款</button>;
  }

  function CancelOrder() {
    if (orderInfoData.status_cancelling)
      return <button className="btn btn-secondary" >取消中</button>;
    else
      return <button className="btn btn-danger" onClick={() => {cancelOrder()}}>取消</button>;
  }

  return <>
    <PayOrder />
    <CancelOrder />
  </>;
}

function clearOrderStatus(setFocusOrderId: Function) {
  localStorage.removeItem('focusOrderId');
  setFocusOrderId('');
}

function FocusingOrderPage({orderId, setFocusOrderId}: OrderIdProp) {
  const [orderInfoData, setOrderInfoData] = useState<OrderInfo | null>(null);

  useEffect(() => { getOrderData(orderId, setOrderInfoData) }, []);

  function BackToOrderList() {
    return <button className="btn btn-primary" onClick={() => { clearOrderStatus(setFocusOrderId) }}>返回</button>;
  }

  if (orderInfoData === null) {
    return <LoadingPage />;
  } else {
    return <>
      <br />
      <OrderInfoDisplay orderInfoData={orderInfoData} />
      <br />
      <OrderActions orderInfoData={orderInfoData} setOrderInfoData={setOrderInfoData} />
      <br />
      <BackToOrderList />
    </>;
  }
}

interface SelectOrderPageProp {
  setFocusOrderId: Function
}

async function getOrders(setOrderInfoDataList: Function, page_number: number, per_page: number) {
  await axios.get(
    '/api/search_cutomer_order',
    {params: {page_number: page_number, per_page: per_page}}
  ).then(resp => {
    console.log('got orders', resp.data)
    setOrderInfoDataList(resp.data.data as Array<OrderInfo>);
  }).catch(resp => {
    console.error('failed to get order:', resp)
  });
  return [];
}

function SelectOrderPage({setFocusOrderId}: SelectOrderPageProp) {
  const [orderInfoDataList, setOrderInfoDataList] = useState<Array<OrderInfo> | null>();

  useEffect(() => {getOrders(setOrderInfoDataList, 1, 10)}, []);

  if (orderInfoDataList === null) {
    return <LoadingPage />;
  } else {
    // BUG: why is it possibly undefined?
    return <ul> {orderInfoDataList?.map( (orderInfoData, index) => {
      return (
        <li key={index}>
        <OrderInfoDisplay orderInfoData={orderInfoData} />
        <button className="btn btn-primary" onClick={() => { setFocusOrderId(orderInfoData.id) }}>更多</button>
        </li>);
    })}</ul>;
  }
}

export default function OrdersPage() {
  const [focusOrderId, setFocusOrderId] = useState<string>('');

  // get initial orders
  useEffect(() => {
    if (localStorage) {
      setFocusOrderId(localStorage.getItem('focusOrderId') || '');
    }
  }, []);

  return (<>
    {focusOrderId === '' ?
    <SelectOrderPage setFocusOrderId={setFocusOrderId} /> :
    <FocusingOrderPage orderId={focusOrderId} setFocusOrderId={setFocusOrderId} />}
  </>);
}
