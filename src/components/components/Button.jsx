import { twMerge } from 'tailwind-merge';

const Button = ({
  children,
  onClick = () => {},
  className = '',
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(`
        cursor-pointer
        bg-gray-600 
        py-2
        px-4
        text-white 
        rounded-sm
        ${className}
        `)}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
