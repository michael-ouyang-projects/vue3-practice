function createNameString(customer, words) {
  let nameString = "";
  if(customer.name.match(/[\u3400-\u9FBF]/)) {
    let appendTime = Math.ceil(customer.name.length / words);
    for(let i = 0; i < appendTime; i++) {
      nameString += customer.name.substring(i * words, (i + 1) * words) + "<br/>";
    }
  } else {
    let length = 0, startIndex = 0;
    let hasBlankSpace = false, blankSpaceIndex = 0;
    for(let i = 0; i < customer.name.length; i++) {
      length++;
      if(customer.name[i] === ' ') {
        hasBlankSpace = true;
        blankSpaceIndex = i;
      }
      if(length === (words * 2) && (i + 1) !== customer.name.length) {
        if(hasBlankSpace) {
          nameString += customer.name.substring(startIndex, blankSpaceIndex) + '<br/>';
          startIndex = blankSpaceIndex + 1;
          hasBlankSpace = false;
          i = blankSpaceIndex;
        } else {
          nameString += customer.name.substring(startIndex, i + 1) + '<br/>';
          startIndex = i + 1;
          if(customer.name[i + 1] === ' ') {
            i++;
          }
        }
        length = 0;
      }
    }
    nameString += customer.name.substring(startIndex, customer.name.length);
  }
  return nameString;
}

export default {
  initializeCustomer: customer => {
    customer.show = true;
    customer.edit = false;
    customer.balanceString = Number(customer.balance).toLocaleString();
    customer.nameString = createNameString(customer, 8);
  }
}
