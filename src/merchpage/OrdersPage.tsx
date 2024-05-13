import { useEffect, useState } from 'react';
import { SelectOrderPage, FocusingOrderPage } from '../orderspage/OrdersFunction.tsx';
import { MerchantOrderActions, getMerchantOrders } from '../orderspage/MerchantOrdersFunction.tsx';

export default function OrdersPage() {
  const [focusOrderId, setFocusOrderId] = useState<string>('');

  // get initial orders
  useEffect(() => {
    if (localStorage) {
      setFocusOrderId(localStorage.getItem('focusOrderId') || '');
    }
  }, []);

  if (focusOrderId === '')
    return <SelectOrderPage setFocusOrderId={setFocusOrderId} getOrders={getMerchantOrders} />;
  else
    return <FocusingOrderPage orderId={focusOrderId} setFocusOrderId={setFocusOrderId} OrderActions={MerchantOrderActions} />;
}
