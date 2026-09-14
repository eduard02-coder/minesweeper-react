import { twMerge } from 'tailwind-merge';

const List = ({ items, className = '' }) => {
  return (
    <ul className={twMerge(`m-0 p-0 ${className}`)}>
      {items.map((elem, index) => (
        <li className="m-0 p-0" key={index}>
          {elem}
        </li>
      ))}
    </ul>
  );
};

export default List;
