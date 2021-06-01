export default {
  sortCustomerIdAsc: customers => {
    customers.sort((a, b) => {
      return a.id - b.id;
    });
  },
  sortCustomerIdDesc: customers => {
    customers.sort((a, b) => {
      return b.id - a.id;
    });
  },

  sortCustomerNameAsc: customers => {
    customers.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  },
  sortCustomerNameDesc: customers => {
    customers.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  },

  sortCustomerPhoneAsc: customers => {
    customers.sort((a, b) => {
      return a.phone.localeCompare(b.phone);
    });
  },
  sortCustomerPhoneDesc: customers => {
    customers.sort((a, b) => {
      return b.phone.localeCompare(a.phone);
    });
  },

  sortCustomerEmailAsc: customers => {
    customers.sort((a, b) => {
      return a.email.localeCompare(b.email);
    });
  },
  sortCustomerEmailDesc: customers => {
    customers.sort((a, b) => {
      return b.email.localeCompare(a.email);
    });
  }
}
