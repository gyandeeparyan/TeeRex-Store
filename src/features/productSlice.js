import { PRODUCT_ERROR, PRODUCT_FILTER, PRODUCT_LOADING, PRODUCT_SEARCH, PRODUCT_SUCESS } from "../Redux/productActions"

const initialData={
    fetchedData:[],
    filterData:[],
    loading:false,
    error:false
}
export const productSlice=(store=initialData,{type,payload})=>{
    switch(type){
        case PRODUCT_LOADING : return {...store, loading:true}
        case PRODUCT_ERROR : return {...store, loading:false,error:true}
        case PRODUCT_SUCESS : return {...store , fetchedData:[...payload] ,filterData:[...payload] , error:false,loading:false}
        case PRODUCT_FILTER : return {...store, filterData:[...handleFilter(store.fetchedData,payload)]}
        case PRODUCT_SEARCH : return {...store , filterData:[...handleSearch(store.fetchedData,payload)]}
        default : return store
    }

}

const handleFilter=(data ,selectedValues)=>{
    let  result= data.filter((e)=>{
         if(selectedValues.includes(e.color)){
            return e
         }
         else if(selectedValues.includes(e.gender)){
            return e
         }
         else if(selectedValues.includes(e.type)){
            return e
         }
         else if(selectedValues.includes("250")){
          
            return e.price<=250
         }
         else if(selectedValues.includes("251")){
          
            return (e.price>=251 && e.price<=450)
         }
         else if(selectedValues.includes("450")){
          
            return  e.price>=450
         }
         
    })
    // console.log("filtered data" , result)
    return result
}

const handleSearch=(data,inputValues)=>{

   let result = data.filter((e)=>{
      let type = e.type;
      let color = e.color;
      let gender = e.gender;

      if(inputValues.length > 1){
         if(color.toLowerCase() == inputValues[0].toLowerCase() && type.toLowerCase() == inputValues[1].toLowerCase() ){
            return e;
         }
      }
      else if(color.toLowerCase() == inputValues[0].toLowerCase()){
         return e;
      }
      else if(gender.toLowerCase() == inputValues[0].toLowerCase()){
         return e;
      }

           
   });
   return result.length  ? result : data

}