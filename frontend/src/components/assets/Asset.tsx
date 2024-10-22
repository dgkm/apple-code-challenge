interface Asset {
    ID: string;
    Host: string;
    Owner: string;
    Comment: string;
    IPs: string[];
    Ports: string[];
}


interface AssetProps {
    item: Asset
}

export const AssetItem = ({ item }: AssetProps) => {
    const ips = (item.IPs || []).map((ip: any) => ip.Address).join(', ');
    const ports = (item.Ports || []).map((port: any) => port.Port).join(', ');
    return (
        <a href={`/assets/${item.ID}`} className="flex flex-col items-center mb-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex flex-col text-3xl font-bold p-12 ml-4 rounded-t-lg h-40 md:w-48 md:rounded-none md:rounded-s-lg bg-white">#{item.ID}</div>
            <div className="flex flex-col justify-between p-4">
                <span className='text-3xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-left'>{item.Host}</span>
                <span className='text-sm mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-left'>Owner: {item.Owner}</span>
                <span className='text-sm mb-2 font-bold text-gray-700 dark:text-gray-400 text-left'>Comment: {item.Comment}</span>
                <span className='text-sm mb-2 text-gray-900 dark:text-white text-left'>IPs: {ips}</span>
                <span className='text-sm mb-2 text-gray-900 dark:text-white text-left'>Ports: {ports}</span>
            </div>
        </a>
    )

}