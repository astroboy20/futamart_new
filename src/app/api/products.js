import axios from "axios"
const url = "https://fakestoreapi.com/products"

const fetchBestProducts = async ()=>{
    try {
        const response = await axios.get(`${url}?limit=4`)
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Error fetching data");
    }

    
}


export {fetchBestProducts}