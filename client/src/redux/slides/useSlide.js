import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  _id: '',
  accessToken: '',
  isAdmin: ''
}

export const useSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const { email = '', name = '',phone = '', address = '', avatar = '', accessToken = '',_id = '', isAdmin} = action.payload
        state.name = name ;
        state.email = email;
        state.phone = phone;
        state.address = address;
        state.avatar = avatar;
        state.id = _id;
        state.accessToken = accessToken
        state.isAdmin = isAdmin
    },
    resetUser: (state) => {
        state.name = '';
        state.email = '';
        state.phone = '';
        state.address = '';
        state.avatar = '';
        state.id = '';
        state.accessToken = '';
        state.isAdmin = '';
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser} = useSlide.actions

export default useSlide.reducer