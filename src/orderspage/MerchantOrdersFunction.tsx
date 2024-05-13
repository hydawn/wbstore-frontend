import axios from 'axios';

export function MerchantOrderActions({orderInfoData, onOrderChange}: OrderActionsProp) {
  async function actOnOrder(action: string) {
    await axios.post(
      '/api/merchant_change_order',
      {action: action, runningorder_id: orderInfoData.id}
    ).then(resp => {
      console.log('got resp:', resp);
      onOrderChange();
    }).catch(
      resp => { console.error('got error:', resp); }
    );
  }

  function TakeOrder() {
    if (orderInfoData.status_taken)
      return <button className="btn btn-primary" disabled>已接受</button>;
    else if (orderInfoData.status_cancelling)
      return <button className="btn btn-primary" onClick={() => {actOnOrder('take')}} disabled>接受订单</button>;
    else
      return <button className="btn btn-primary" onClick={() => {actOnOrder('take')}}>接受订单</button>;
  }

  function AcceptCancelOrder() {
    if (orderInfoData.status_cancelling)
      return <button className="btn btn-danger" onClick={() => {actOnOrder('accept cancel')}}>接受取消</button>;
    else
      return <button className="btn btn-danger" disabled>用户未申请取消</button>;
  }

  if (orderInfoData.status_end === 'finished') {
    return <>order finished</>
  } else if (orderInfoData.status_end === 'cancelled') {
    return <>order cancelled</>
  }

  return <>
    <TakeOrder />
    <AcceptCancelOrder />
  </>;
}

export async function getMerchantOrders(setOrderInfoDataList: Function, page_number: number, per_page: number) {
  await axios.get(
    '/api/search_merchant_order',
    {params: {page_number: page_number, per_page: per_page}}
  ).then(resp => {
    console.log('got orders', resp.data)
    setOrderInfoDataList(resp.data.data as Array<OrderInfo>);
  }).catch(resp => {
    console.error('failed to get order:', resp)
  });
  return [];
}
