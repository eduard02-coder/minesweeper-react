import { Link as ReactLink } from 'react-router-dom';

const Link = ({ to, children }) => {
  return (
    <ReactLink className="hover:text-red-700 hover:underline" to={to}>
      {children}
    </ReactLink>
  );
};

export default Link;
