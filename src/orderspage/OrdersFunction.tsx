import { useEffect, useState } from "react"
import axios from 'axios';

import LoadingPage from '../LoadingPage';

interface OrderInfoDisplayProp {
  orderInfoData: OrderInfo,
}

interface OrderIdProp {
  orderId: string
  setFocusOrderId: Function
  OrderActions: (props: {
    orderInfoData: OrderInfo
    onOrderChange: Function
  }) => JSX.Element
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

function clearOrderStatus(setFocusOrderId: Function) {
  localStorage.removeItem('focusOrderId');
  setFocusOrderId('');
}

export function FocusingOrderPage({orderId, setFocusOrderId, OrderActions}: OrderIdProp) {
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
      <OrderActions orderInfoData={orderInfoData} onOrderChange={() => {getOrderData(orderId, setOrderInfoData)}} />
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

export function SelectOrderPage({setFocusOrderId}: SelectOrderPageProp) {
  const [orderInfoDataList, setOrderInfoDataList] = useState<Array<OrderInfo> | null>();

  useEffect(() => {getOrders(setOrderInfoDataList, 1, 10)}, []);

  if (orderInfoDataList === null) {
    return <LoadingPage />;
  } else {
    // BUG: why is it possibly undefined?
    return <ul>{orderInfoDataList?.map((orderInfoData, index) => {
      return (
        <li key={index}>
        <OrderInfoDisplay orderInfoData={orderInfoData} />
        <button className="btn btn-primary" onClick={() => { setFocusOrderId(orderInfoData.id) }}>更多</button>
        </li>
      );
    })}</ul>;
  }
}
