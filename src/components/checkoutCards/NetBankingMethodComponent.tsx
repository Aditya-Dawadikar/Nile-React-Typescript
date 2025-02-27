import axios from 'axios'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setPayment, getPayment } from '../../redux/actions/BuyerPayment'

const NetBankingMethodComponent = (props: any) => {
  let buyerPaymentList = useSelector((state: any) => state.buyerPaymentInfo.BuyerPaymentList)
  const dispatch = useDispatch()
  let auth = JSON.parse(sessionStorage.getItem("user") || "{}");

  const deletePaymentOption = (e: any, index: number) => {
    let data = buyerPaymentList.filter((ele: any, ind: number) => { return ind !== index })
    try {
      axios.delete(`http://localhost:9000/api/payment/delete/${index}`, {
        data: { userid: auth['userid'] }
      })
      toast.success("Payment method successfully deleted")
      dispatch(getPayment(data))
    }
    catch (err) {
      console.log(err)
    }
  }

  return <div className='std-card std-mode-dimension'>
    <p className='std-boldFont m-0'>{props.bank.BankingInfo.payment_type}</p>
    <p className='std-boldFont m-0'>{props.bank.BankingInfo.account_number}</p>
    <p className='m-0'>Bank: {props.bank.BankingInfo.bank_name}</p>
    {
      props.edit === true ? <button className='std-btn  std-btnOrange' onClick={(e) => deletePaymentOption(e, props.index)}>
        <AiFillDelete /> Remove
      </button> : <></>
    }
  </div>
}

export default NetBankingMethodComponent