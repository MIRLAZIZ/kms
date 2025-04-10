export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
    action: 'read',
    subject: 'AclDemo',
  },
  {
    title: 'clients.title',
    // to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
    children: [
      {
        title: 'clients.all', to: 'users', action: 'read',
        subject: 'AclDemo',
      },
      {
        title: 'Second page', to: 'users', action: 'read',
        subject: 'AclDemo',
      }],
    action: 'read',
    subject: 'AclDemo',
  },
  {
    title: 'settings',
    to: { name: 'settings' },
    icon: { icon: 'tabler-settings' },
    action: 'read',
    subject: 'AclDemo',
  },
]
