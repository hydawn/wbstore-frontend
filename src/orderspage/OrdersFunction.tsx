import { useEffect, useState } from "react"
import axios from 'axios';
import { BookInfo } from "../types/BookTypes";

import LoadingPage from '../LoadingPage';

interface OrderInfoDisplayProp {
  orderInfoData: OrderInfo
  OrderActions: () => JSX.Element
}

interface FocusingOrderPageProp {
  orderId: string
  setFocusOrderId: Function
  OrderActions: (props: {
    orderInfoData: OrderInfo
    onOrderChange: Function
  }) => JSX.Element
}

function OrderInfoDisplay({orderInfoData, OrderActions}: OrderInfoDisplayProp) {
  const [bookData, setBookData] = useState<BookInfo | null>(null);

  useEffect(() => {
    console.log(`try /api/get_merchandise detail ${orderInfoData.merchandise_id}`)
    axios.get(
      '/api/get_merchandise',
      {params: {merchandise_id: orderInfoData.merchandise_id} }
    ).then((resp) => {
      console.log('get /api/get_merchandise detail')
      setBookData(resp.data.data as BookInfo);
    }).catch((resp) => {
      console.error('/api/get_merchandise error:', resp)
    })
  }, []);

  if (bookData === null)
    return <></>;
  const base64Image = `data:${bookData.image_type};base64,${bookData.image_description}`;
  return <div className="card" style={{width: '32rem'}}>
    <img src={base64Image} className="card-img-top" alt={bookData.name} />
    <div className="card-body">
      <h5 className="card-title">{bookData.name}</h5>
      <p className="card-text">用户{orderInfoData.username}创立的订单，订单号{orderInfoData.id}</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">数量：{orderInfoData.count}</li>
      <li className="list-group-item">总价格：{orderInfoData.total_price}</li>
      <li className="list-group-item">{orderInfoData.status_paid ? '已付款' : '未付款'}</li>
      <li className="list-group-item">{orderInfoData.status_taken ? '已接单' : '商家未接单'}</li>
      {orderInfoData.status_cancelling ? <li className="list-group-item">取消中</li> : <></>}
      {orderInfoData.status_end ? <li className="list-group-item">订单已结束</li> : <></>}
      <li className="list-group-item">下单日期{orderInfoData.added_date.split('.')[0].replace('T', ' ')}</li>
    </ul>
    <div className="card-body">
      <OrderActions />
    </div>
  </div>
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

export function FocusingOrderPage({orderId, setFocusOrderId, OrderActions}: FocusingOrderPageProp) {
  const [orderInfoData, setOrderInfoData] = useState<OrderInfo | null>(null);

  useEffect(() => { getOrderData(orderId, setOrderInfoData) }, []);

  function BackToOrderList() {
    return <button className="btn btn-primary" onClick={() => { clearOrderStatus(setFocusOrderId) }}>返回</button>;
  }

  function LocalActions() {
    if (orderInfoData != null)
      return <OrderActions orderInfoData={orderInfoData} onOrderChange={() => {getOrderData(orderId, setOrderInfoData)}} />;
    return <></>;
  }

  if (orderInfoData === null)
    return <LoadingPage />;
  return <>
    <br />
    <OrderInfoDisplay orderInfoData={orderInfoData} OrderActions={LocalActions} />
    <br />
    <BackToOrderList />
  </>;
}

interface SelectOrderPageProp {
  setFocusOrderId: Function
  getOrders: Function
}

export function SelectOrderPage({setFocusOrderId, getOrders}: SelectOrderPageProp) {
  const [orderInfoDataList, setOrderInfoDataList] = useState<Array<OrderInfo> | null>();

  useEffect(() => {getOrders(setOrderInfoDataList, 1, 10)}, []);

  if (orderInfoDataList === null)
    return <LoadingPage />;
  return <ul>{orderInfoDataList?.map((orderInfoData, index) => {
    function LocalActions() {
      return <button className="btn btn-primary" onClick={() => { setFocusOrderId(orderInfoData.id) }}>更多</button>;
    }
    return (
      <li key={index}>
        <OrderInfoDisplay orderInfoData={orderInfoData} OrderActions={LocalActions} />
      </li>
    );
  })}</ul>;
}
