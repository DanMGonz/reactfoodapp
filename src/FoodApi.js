import axios from 'axios';

async function FetchData(url){
    const configGet={
      method:"post",
      headers:{'X-RapidAPI-Key':"5d74d548eemsh667086d1d639f20p1a3373jsn3945c6e09dae"}

  };
  return axios.get(url,configGet);


}

export default FetchData

  