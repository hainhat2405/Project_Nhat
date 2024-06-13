import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orderItems: [
        // {
        //     name: '',
        //     amount: '',
        //     image: '',
        //     price: '',
        //     product: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Product',
        //         required: true,
        //     },
        // },
    ],
    selectedItemOrder:[],
    ShippingAddress: {
        // fullName: {type: String, required: true},
        // address: {type: String, required: true,},
        // city: {type: String, required: true},
        // phone: {type: Number, required: true},
    },
    paymentMethod: '',
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const {orderItem} = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem. product)
            if(itemOrder){
                itemOrder.amount += orderItem?.amount
            }
            else{
                state.orderItems.push(orderItem)
            }
        } ,
        removeOrderProduct: (state, action) => {
            const {idProduct} = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            console.log('removeOrderProduct', {idProduct, itemOrder})
            state.orderItems = itemOrder 
            
        },
        // selectedOrder: (state, action) => {
        //     const listChecked = action.payload
        //     const orderSelected = []
        //     state.orderItems.forEach((order) => {
        //         if(listChecked.includes(order.product)){
        //             orderSelected.push(order)
        //         }
        //     })
        //     state.selectedItemOrder = orderSelected
            
        // } 
    }
})

export const {addOrderProduct, removeOrderProduct,selectedOrder} = orderSlide.actions

export default orderSlide.reducer