import { ContentWithTooltip } from './Content';
import { AssetType, IPType, PortType } from './types';

interface AssetProps {
  item: AssetType;
  link?: boolean;
}

export const AssetItem = ({ item, link = true }: AssetProps) => {
  const ips = (item.IPs || []).map((ip: IPType, index) => (
    <ContentWithTooltip
      key={ip.Address}
      content={ip.Address}
      tooltip={ip.Signature}
      last={index > item.IPs.length - 2}
    />
  ));
  const ports = (item.Ports || []).map((port: PortType, index) => (
    <ContentWithTooltip
      key={port.Port}
      content={port.Port}
      tooltip={port.Signature}
      last={index > item.Ports.length - 2}
    />
  ));

  const hoverClass = link ? 'hover:bg-gray-100 dark:hover:bg-gray-200' : '';

  return (
    <div className='flex flex-col items-center mb-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row  dark:border-gray-700 dark:bg-gray-800'>
      <a href={link ? `/assets/${item.ID}` : undefined}>
        <div
          className={`flex flex-col items-center justify-center text-3xl font-bold m-1 rounded-t-lg h-56 w-full md:w-56 md:rounded-none md:rounded-s-lg bg-white ${hoverClass}`}
        >
          #{item.ID}
        </div>
      </a>
      <div className='flex flex-col justify-between p-4'>
        <span className='text-3xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-left'>
          {item.Host}
        </span>
        <span className='text-sm mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-left'>
          Owner: {item.Owner}
        </span>
        <span className='text-sm mb-2 font-bold text-gray-700 dark:text-gray-400 text-left'>
          Comment: {item.Comment}
        </span>
        <span className='text-sm mb-2 text-gray-900 dark:text-white text-left'>
          IPs: {ips}
        </span>
        <span className='text-sm mb-2 text-gray-900 dark:text-white text-left'>
          Ports: {ports}
        </span>
        <span className='text-sm mb-2 text-gray-700 dark:text-gray-400 text-left truncate w-30 break-all text-wrap'>
          Signature: {item.Signature}
        </span>
      </div>
    </div>
  );
};
