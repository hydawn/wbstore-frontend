import axios from 'axios';

export default function CustomerOrderActions({orderInfoData, onOrderChange}: OrderActionsProp) {
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
    return <button className="btn btn-success" onClick={() => {actOnOrder('finish')}}>确认收货</button>;
  }

  return <>
    <PayOrder />
    <CancelOrder />
    <FinishOrder />
  </>;
}
