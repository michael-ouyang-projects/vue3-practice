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

  sortCustomerSexAsc: customers => {
    customers.sort((a, b) => {
      return a.sex.localeCompare(b.sex);
    });
  },
  sortCustomerSexDesc: customers => {
    customers.sort((a, b) => {
      return b.sex.localeCompare(a.sex);
    });
  },

  sortCustomerAgeAsc: customers => {
    customers.sort((a, b) => {
      return a.age - b.age;
    });
  },
  sortCustomerAgeDesc: customers => {
    customers.sort((a, b) => {
      return b.age - a.age;
    });
  },

  sortCustomerBalanceAsc: customers => {
    customers.sort((a, b) => {
      return a.balance - b.balance;
    });
  },
  sortCustomerBalanceDesc: customers => {
    customers.sort((a, b) => {
      return b.balance - a.balance;
    });
  }
}
