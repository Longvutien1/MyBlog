import axios from "axios";

interface ApiPostType  {
    [key: string]: number | string;
 
}

export const getPostList = async (mang:any) => {
    console.log(mang.page);
    
    const { data } = await axios.get(`http://localhost:3000/api/post?page=${mang.page}&title=${mang.title}&categoryPost=${mang.categoryPost}`);
    
    return {data}
}


