interface OrderInfo {
  id: string
  // username
  username: string
  user_id: string
  merchandise_id: string
  count: number
  total_price: number
  status_paid: boolean
  status_taken: boolean
  status_cancelling: boolean
  status_end: string
  status_incart: boolean
  added_date: string
}

interface OrderActionsProp {
  orderInfoData: OrderInfo
  onOrderChange: Function
}
