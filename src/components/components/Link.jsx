import { Link as ReactLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Link = ({ to, children, className }) => {
  return (
    <ReactLink className={twMerge(`hover:text-red-700 ${className}`)} to={to}>
      {children}
    </ReactLink>
  );
};

export default Link;
