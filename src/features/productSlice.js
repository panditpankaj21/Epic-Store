import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    items: [],
    cartProduct: [],
    status:'idle',
    error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    try{
        const response = await fetch("https://dummyjson.com/products")
        if(!response.ok){
            throw new Error("Network response was not ok!")
        }
        const data = await response.json()
        return data.products
    }catch(error){
        throw new Error(`fetch error ${error.message}`)
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        addCartItem: (state, action) => {
           state.cartProduct.push(action.payload) 
        }

    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchData.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.status="succeded"
            state.items=action.payload
        })
        .addCase(fetchData.rejected, (state, action) => {
            state.status="failed"
            state.error=action.error.message
        })

    }

})

export const {addCartItem} =productSlice.actions
export default productSlice.reducer
