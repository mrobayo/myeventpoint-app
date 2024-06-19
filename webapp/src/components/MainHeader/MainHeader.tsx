import { Autocomplete, Group, Burger, rem, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import railway from '@/images/railway.png';
import classes from './MainHeader.module.css';

const links = [
  { link: '/today', label: 'Hoy día' },
  // { link: '/head-desk', label: 'Head desk' },
  // { link: '/by-speciality', label: 'By Speciality' },
];
export function MainHeader({ opened, toggle }: { opened: boolean, toggle: () => void }) {
  //const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <img src={railway} alt="Icon by Design Circle" width={42} height={42} />
          <Title order={3}>Event Point</Title>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search event"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['Visita', 'Reunión amigos', 'Presentación', 'Día', 'Aniversario', 'Festival']}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}
