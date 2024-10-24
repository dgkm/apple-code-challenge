import { ReactNode } from 'react';

interface ContentWithTooltipProps {
  content: ReactNode;
  tooltip?: string;
  last?: boolean;
}

export const ContentWithTooltip = ({
  content,
  tooltip,
  last = false,
}: ContentWithTooltipProps) => {
  return (
    <>
      <abbr title={tooltip}>{content}</abbr>
      {!last && `, `}{' '}
    </>
  );
};
