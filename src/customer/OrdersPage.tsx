import { useEffect, useState } from 'react';
import { SelectOrderPage, FocusingOrderPage } from '../orderspage/OrdersFunction.tsx';
import CustomerOrderActions from '../orderspage/CustomerOrdersFunction.tsx';

export default function OrdersPage() {
  const [focusOrderId, setFocusOrderId] = useState<string>('');

  // get initial orders
  useEffect(() => {
    if (localStorage) {
      setFocusOrderId(localStorage.getItem('focusOrderId') || '');
    }
  }, []);

  if (focusOrderId === '')
    return <SelectOrderPage setFocusOrderId={setFocusOrderId} />;
  else
    return <FocusingOrderPage orderId={focusOrderId} setFocusOrderId={setFocusOrderId} OrderActions={CustomerOrderActions} />;
}
