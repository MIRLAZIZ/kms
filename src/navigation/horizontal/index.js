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
    to: { name: 'customers' },
    icon: { icon: 'tabler-users' },
    // children: [
    //   {
    //     title: 'clients.all', to: 'customers-all', action: 'read',
    //     subject: 'AclDemo',
    //   },

    //   {
    //     title: 'clients.new', to: 'customers-new', action: 'read',
    //     subject: 'AclDemo',
    //   },
    //   {
    //     title: 'clients.approved', to: 'customers-approved', action: 'read',
    //     subject: 'AclDemo',
    //   },
    //   {
    //     title: 'clients.rejected', to: 'customers-rejected', action: 'read',
    //     subject: 'AclDemo',
    //   }],
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
  {
    title: 'requests.title',
    to: { name: 'requests' },
    icon: { icon: 'tabler-sort-descending' },
    action: 'read',
    subject: 'AclDemo',
  },
  {
    title: 'certificates.title',
    to: { name: 'certificates' },
    icon: { icon: 'tabler-file-certificate' },
    action: 'read',
    subject: 'AclDemo',
  },
]
