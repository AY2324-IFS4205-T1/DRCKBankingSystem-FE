export const page_permissions = {
  '/': '',
  '/customer/register': '',
  '/customer/login': '',
  '/staff/login': '',

  '/customer/dashboard': 'Customer',
  '/customer/atm': 'Customer',
  '/customer/setup': 'Customer',
  '/customer/verify': 'Customer',
  '/customer/accounts': 'Customer',
  '/customer/tickets': 'Customer',
  '/customer/transfer': 'Customer',

  '/staff/dashboard': 'Staff',
  '/staff/setup': 'Staff',
  '/staff/verify': 'Staff',
  '/staff/anon': 'Staff',
  '/staff/logs': 'Auditor',
  '/staff/tickets': 'Ticket Reviewer',
};
// /staff/anon is a shared page between Researcher & Anonymity Officer. Access control is handled manually.

/*
  /
  /customer/login
  /customer/register
  /customer/dashboard
  /customer/atm
  /customer/setup
  /customer/verify
  /customer/accounts
  /customer/accounts/4fb8bf82-4531-4e87-8c05-37ceaff368ac
  /customer/tickets
  /customer/tickets/create
  /customer/tickets/4fb8bf82-4531-4e87-8c05-37ceaff368ac
  /customer/transfer
  /customer/transfer/confirm
  /staff/login
  /staff/dashboard
  /staff/setup
  /staff/verify
  /staff/anon
  /staff/tickets
  /staff/tickets/4fb8bf82-4531-4e87-8c05-37ceaff368ac
/** */