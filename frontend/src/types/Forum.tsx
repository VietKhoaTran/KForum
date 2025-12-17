export type TopicLabel = 'created' | 'joined' | 'trending';

export interface Topic {
  id: number;
  title: string;
  description: string;
  label: TopicLabel;
}
