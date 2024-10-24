import { ReactNode } from 'react';

interface CardHeaderProps {
  link?: string;
  title: ReactNode;
}

export const CardHeader = ({ link, title }: CardHeaderProps) => {
  const hoverClass = link ? 'hover:bg-gray-100 dark:hover:bg-gray-200' : '';

  return (
    <a href={link ?? undefined}>
      <div
        className={`flex flex-col items-center justify-center text-3xl font-bold m-1 rounded-t-lg h-56 w-full md:w-56 md:rounded-none md:rounded-s-lg bg-white ${hoverClass}`}
      >
        {title}
      </div>
    </a>
  );
};

interface CardContentProps {
  children: ReactNode;
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className='flex flex-col justify-between p-4'>{children}</div>;
};

const CardItemClasses = {
  one: 'text-3xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-left',
  two: 'text-sm mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-left',
  three: 'text-sm mb-2 font-bold text-gray-700 dark:text-gray-400 text-left',
  four: 'text-sm mb-2 text-gray-900 dark:text-white text-left',
  five: 'text-xs mb-2 text-gray-700 dark:text-gray-400 text-left truncate w-30 break-all text-wrap',
};

type CardItemClassKeys = keyof typeof CardItemClasses;

interface CardItemProps {
  type: CardItemClassKeys;
  children: ReactNode;
}

export const CardItem = ({ type = 'one', children }: CardItemProps) => {
  return <span className={CardItemClasses[`${type}`]}>{children}</span>;
};

interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className='flex flex-col items-center mb-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row  dark:border-gray-700 dark:bg-gray-800'>
      {children}
    </div>
  );
};
