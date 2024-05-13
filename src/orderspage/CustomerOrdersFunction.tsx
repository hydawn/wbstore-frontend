import axios from 'axios';

export function CustomerOrderActions({orderInfoData, onOrderChange}: OrderActionsProp) {
  async function actOnOrder(action: string) {
    console.log(`${action} order ${orderInfoData.id}`)
    await axios.post(
      '/api/customer_change_order',
      { action: action, runningorder_id: orderInfoData.id }
    ).then(resp => {
      console.log('got resp:', resp);
      // reload it
      onOrderChange();
    }).catch(
      resp => { console.error('got error:', resp); }
    );
  }

  function PayOrder() {
    if (orderInfoData.status_paid)
      return <button className="btn btn-primary" disabled>已付款</button>;
    else
      return <button className="btn btn-primary" onClick={() => {actOnOrder('pay')}}>付款</button>;
  }

  function CancelOrder() {
    if (orderInfoData.status_cancelling)
      return <button className="btn btn-danger" disabled>取消中</button>;
    else
      return <button className="btn btn-danger" onClick={() => {actOnOrder('cancel')}}>取消</button>;
  }

  function FinishOrder() {
    if (orderInfoData.status_taken)
      return <button className="btn btn-success" onClick={() => {actOnOrder('finish')}}>确认收货</button>;
    else
      return <button className="btn btn-success" disabled>确认收货（商家未接受订单）</button>;
  }

  if (orderInfoData.status_end === 'finished') {
    return <>order finished</>
  } else if (orderInfoData.status_end === 'cancelled') {
    return <>order cancelled</>
  }
  return <>
    <PayOrder />
    <CancelOrder />
    <FinishOrder />
  </>;
}

export async function getCustomerOrders(setOrderInfoDataList: Function, page_number: number, per_page: number) {
  await axios.get(
    '/api/search_customer_order',
    {params: {page_number: page_number, per_page: per_page}}
  ).then(resp => {
    console.log('got orders', resp.data)
    setOrderInfoDataList(resp.data.data as Array<OrderInfo>);
  }).catch(resp => {
    console.error('failed to get order:', resp)
  });
  return [];
}
