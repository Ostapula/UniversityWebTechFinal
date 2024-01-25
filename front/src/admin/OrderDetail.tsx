import { Product } from '@/shared/types';

type Props = {
  title: string;
  item: Product;
}

const OrderDetail = ({title, item}: Props) => {
  return (
    <div>
      {item.image === 'null' ? ("") : (
        <div>
          <h3 className="font-medium">{title}</h3>
          <img src={item.image} className="w-[100px]" />
          <p>{item.name}</p>
          <p className="text-sm text-gray-600">{`${item.price.toFixed(2)}`}</p>
        </div>
      )}
    </div>
  )
}

export default OrderDetail