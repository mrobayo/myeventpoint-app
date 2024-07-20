import { Entity } from '@/types/common-model';

export type SystemType = {
  id: number | null;
  name: string;
  editable: boolean;
  system: boolean;
};

// Topics (it's unique)
export type TopicType = Entity<number> & {
  name: string;
  systemId?: number;
  disabled: boolean;
  updated?: string;
};

export type NewTopicType = Omit<TopicType, 'id'>;

//export type TopicId = infer TopicType;
export type TopicKey = TopicType['id'];
