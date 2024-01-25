import { motion } from "framer-motion";

type Props = {
  name: string,
  description: string,
  price: number,
  image: string,
  onClick: () => void;
}

const childVariant = {
  hidden: {opacity: 0, scale: 0.9},
  visible: {opacity: 1, scale: 1}
}

const ProductCart = ({ name, description, price, image, onClick } : Props) => {
  const currentDate = new Date();
  const formatDate = (date: Date): string => {
    date.setDate(date.getDate() + 2);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  return (
    <motion.div 
      variants={childVariant}
      className="max-w-sm bg-white rounded-lg shadow-md"
    >
      <img className="p-8" src={image} alt={name} />

      <div className="px-5 pb-5">
        <h5 className="sm:text-xl font-semibold tracking-tight text-gray-900">{name}</h5>
        
        <div className="flex items-center mt-2.5 mb-5">
          <span className="bg-yellow-400 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">TOP SELLER</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="sm:text-3xl font-bold text-gray-900">${price}</span>
          <button
            onClick={onClick}
            className="text-white bg-secondary-500 hover:bg-primary-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm xs:px-5 xs:py-2.5 px-2 py-1.5 m-1 text-center">
            Add to Cart
          </button>
        </div>

        <div className="flex flex-col mt-3">
          <span className="text-gray-700 font-bold">Key Features:</span>
          <ul className="text-sm text-gray-600">
            {description}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className={`text-sm text-green-600`}>
            {`In Stock`}
          </span>
          <span className="text-sm text-gray-500">{`Order now to ship ${formatDate(currentDate)}`}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCart