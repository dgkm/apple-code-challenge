'use server';

import {
  Card,
  CardContent,
  CardHeader,
  CardItem,
} from '@/components/custom/card/Card';

import { changeLog } from './changeLog';

export const Changes = () => {
  const changes = (changeLog || []).map((change, index) => (
    <Card key={`${index}-${change.issue}`}>
      <CardHeader title={`Issue #${index + 1}`} />
      <CardContent>
        <CardItem type='one'>{change.issue}</CardItem>
        <CardItem type='three'>Description: {change.description}</CardItem>
        <CardItem type='four'>Solution Approach: {change.solution}</CardItem>
        <CardItem type='two'>Category: {change.category}</CardItem>
        <CardItem type='five'>Status: {change.status}</CardItem>
      </CardContent>
    </Card>
  ));
  return <div>{changes}</div>;
};
