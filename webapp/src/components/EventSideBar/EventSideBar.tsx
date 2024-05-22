import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { SegmentedControl } from '@mantine/core';
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './EventSideBar.module.css';

const tabs = {
  system: [
    // { link: '', label: 'Notificaciones', icon: IconBellRinging },
    // { link: '', label: 'Facturación', icon: IconReceipt2 },
    // { link: '', label: 'Securidad', icon: IconFingerprint },
    // { link: '', label: 'SSH Keys', icon: IconKey },
    // { link: '', label: 'Base Datos', icon: IconDatabaseImport },
    { link: '', label: 'Usuarios', icon: Icon2fa },
    { link: '/account', label: 'Account', icon: IconSettings },
  ],
  events: [
    { link: '', label: 'Eventos', icon: IconShoppingCart },
    // { link: '', label: 'Proveedores', icon: IconLicense },
    // { link: '', label: 'Resultados', icon: IconMessage2 },
    // { link: '', label: 'Messages', icon: IconMessages },
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
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Cambiar usuario</span>
          </a>

          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Salir</span>
          </a>
        </div>
      </nav>
  );
}
