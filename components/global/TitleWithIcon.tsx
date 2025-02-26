import React from "react";

interface TitleWithIconProps {
  title: string;
  icon: React.ElementType;
  className?: string;
}

const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  title,
  icon: Icon,
  className = "",
}) => {
  return (
    <h2
      className={`flex gap-x-2 text-sm font-medium text-blue-900 sm:text-2xl ${className}`}
    >
      <Icon className='text-blue-400 sm:h-10 sm:w-10' />
      {title}
    </h2>
  );
};

export default TitleWithIcon;
