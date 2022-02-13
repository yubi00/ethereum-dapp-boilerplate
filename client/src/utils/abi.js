import axios from 'axios';

const getAbi = async () => {
  try {
    const res = await axios.get('Token.json');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAbi;
