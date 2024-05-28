import { useEffect, useState } from 'react';

interface AreasProps {
  id: number;
  name: string;
  disabled: boolean;
  created: string;
  updated: string;
}

export function Areas({ id, name, disabled }: AreasProps) {
  const [abc, setAbc] = useState(true);
  useEffect(() => {
    setAbc(true);
  }, []);
  return (
    <div>{id} - {name} - {disabled} = {abc}</div>
  );
}
