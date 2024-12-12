import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    open:false,
    emails:[],
    selectedMail:null,
    profile:false,
    searchText:'',
  },
  reducers: {
    setUser: (state,action) => {
      
      state.user = action.payload
    },
    setOpen: (state,action) => {
      
      state.open = action.payload
    },
    setEmails: (state,action) => {
      
      state.emails = action.payload
    },
    setSelectedMail: (state,action) => {
      
      state.selectedMail = action.payload
    },
    setProfile: (state,action) => {
      
      state.profile = action.payload
    },
    setSearchText: (state,action) => {
      
      state.searchText = action.payload
    },
   
  },
})


export const { setUser,setOpen,setEmails,setSelectedMail ,setProfile,setSearchText} = appSlice.actions

export default appSlice.reducer