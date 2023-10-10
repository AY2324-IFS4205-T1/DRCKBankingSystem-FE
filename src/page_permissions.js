export const page_permissions = {
    '/customer/dashboard': 'Customer',
    '/customer/atm': 'Customer',
    '/customer/setup': 'Customer',
    '/customer/verify': 'Customer',
    '/customer/accounts': 'Customer',
    '/customer/tickets': 'Customer',
    '/customer/transfer': 'Customer',

    '/staff/dashboard:': 'Staff',
    '/staff/setup:': 'Staff',
    '/staff/verify:': 'Staff',
    '/staff/anon:': 'Auditor',
    '/staff/tickets:': 'Ticket Reviewer',
};

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