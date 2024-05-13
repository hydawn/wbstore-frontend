import axios from 'axios';

export default function CustomerOrderActions({orderInfoData, onOrderChange}: OrderActionsProp) {
  async function cancelOrder() {
    console.log(`cancel order ${orderInfoData.id}`)
    await axios.post(
      '/api/customer_change_order',
      { action: 'cancel', runningorder_id: orderInfoData.id }
    ).then(resp => {
      console.log('got resp:', resp);
      // reload it
      onOrderChange();
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
      onOrderChange();
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
