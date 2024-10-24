import { ContentWithTooltip } from './Content';
import { AssetType, IPType, PortType } from './types';
import { Card, CardContent, CardHeader, CardItem } from '../card/Card';

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

  return (
    <Card>
      <CardHeader
        title={`#${item.ID}`}
        link={link ? `/assets/${item.ID}` : undefined}
      />
      <CardContent>
        <CardItem type='one'>{item.Host}</CardItem>
        <CardItem type='two'>Owner: {item.Owner}</CardItem>
        <CardItem type='three'>Comment: {item.Comment}</CardItem>
        <CardItem type='four'>IPs: {ips}</CardItem>
        <CardItem type='four'>Ports: {ports}</CardItem>
        <CardItem type='five'>Signature: {item.Signature}</CardItem>
      </CardContent>
    </Card>
  );
};
