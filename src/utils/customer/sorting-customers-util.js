export default {
  sortCustomerIdAsc: customers => {
    customers.sort((a, b) => {
      if(a.customerId[0] === b.customerId[0]) {
        return b.customerId.substring(1).localeCompare(a.customerId.substring(1));
      } else {
        return a.customerId[0].localeCompare(b.customerId[0]);
      }
    });
  },
  sortCustomerIdDesc: customers => {
    customers.sort((a, b) => {
      if(a.customerId[0] === b.customerId[0]) {
        return a.customerId.substring(1).localeCompare(b.customerId.substring(1));
      } else {
        return b.customerId[0].localeCompare(a.customerId[0]);
      }
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
