
export type SystemType = {
  id?: number;
  name: string;
  editable: boolean;
  system: boolean;
};


// Topics (it's unique)
export type TopicType = {
  id?: number;
  name: string;
  systemId?: number;
  disabled: boolean;
  updated?: string;
};
