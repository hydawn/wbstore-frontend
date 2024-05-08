import { useEffect } from "react"

interface Prop {
  focusOrderId: string
  setFocusOrderId: Function
}

interface OrderInfoProp {
  focusOrderId: string
}

function OrderInfoDisplay({focusOrderId}: OrderInfoProp) {
  return <>order {focusOrderId} info here</>
}

function PlaceOrder() {
  return <>place order here</>
}

function FocusingOrderPage({focusOrderId}: OrderInfoProp) {
  return (<><OrderInfoDisplay focusOrderId={focusOrderId} /><PlaceOrder /></>);
}

interface SelectOrderPageProp {
  setFocusOrderId: Function
}

function SelectOrderPage({setFocusOrderId}: SelectOrderPageProp) {
  function getOrders(page_number: number, per_page: number) {
  }
  useEffect(() => {getOrders(1, 10)}, []);
  return <ul><li>order list here</li></ul>
}

export default function OrdersPage({focusOrderId, setFocusOrderId}: Prop) {
  return (<>
    {focusOrderId === '' ?
    <SelectOrderPage setFocusOrderId={setFocusOrderId}/> :
    <FocusingOrderPage focusOrderId={focusOrderId}/>}
  </>);
}
