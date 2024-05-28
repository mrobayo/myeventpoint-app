import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { SegmentedControl } from '@mantine/core';
import {
  IconLicense,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  IconUsers,
  IconDatabaseImport,
  IconReceipt2,
  IconTicket,
  IconLogout,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './EventSideBar.module.css';

const tabs = {
  system: [
    { link: '/areas', label: 'Areas', icon: IconReceipt2 },
    { link: '/services', label: 'Servicios', icon: IconFingerprint },
    { link: '/offices', label: 'Oficinas', icon: IconBellRinging },
    { link: '/agents', label: 'Agentes', icon: IconKey },
    { link: '/batch', label: 'Batch', icon: IconDatabaseImport },
    { link: '/system', label: 'Sistema', icon: IconSettings },
  ],
  events: [
    { link: '/agenda', label: 'Agenda', icon: IconLicense },
    { link: '/users', label: 'Usuarios', icon: IconUsers },
    { link: '/eventos', label: 'Eventos', icon: IconTicket },
    { link: '/archive', label: 'Archivo', icon: IconLicense },
    { link: '/channels', label: 'Canales', icon: IconMessages },
    // { link: '', label: 'Resultados', icon: IconMessage2 },
    // { link: '', label: 'Pacientes', icon: IconUsers },
    // { link: '', label: 'Reclamos', icon: IconReceiptRefund },
    // { link: '', label: 'Archivos', icon: IconFileAnalytics },
  ],
};

export function EventSideBar() {
  const [value, setValue] = useState<Date | null>(null);
  const [section, setSection] = useState<'events' | 'system'>('events');
  const [active, setActive] = useState('Billing');

  const links = tabs[section].map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
      <nav className={classes.navbar}>
        <div>
          <SegmentedControl
            value={section}
            onChange={(selected: any) => setSection(selected)}
            transitionTimingFunction="ease"
            fullWidth
            data={[
                { label: 'Eventos', value: 'events' },
                { label: 'Sistema', value: 'system' },
              ]}
          />
        </div>
        <div className={classes.navbarMain}><DatePicker value={value} onChange={setValue} /></div>
        <div className={classes.navbarMain}>{links}</div>
        <div className={classes.footer}>
          {/*<a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>*/}
          {/*  <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />*/}
          {/*  <span>Cambiar usuario</span>*/}
          {/*</a>*/}
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Salir</span>
          </a>
        </div>
      </nav>
  );
}
