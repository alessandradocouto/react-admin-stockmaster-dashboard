import api from "../services/api";

// SignUp

export const validateNoOffensiveTerms = (value) => {
  const offensiveTerms = ["babaca", "macaco", "merda", "sujo", "viado", "fdp", "viadinho", "puta"];
  const regex = new RegExp(`\\b(${offensiveTerms.join('|')})\\b`, 'i');
  return !regex.test(value) || "Nome contém termos ofensivos ou discriminatórios.";
};

export async function validateUserName(userName) {
  try {
    const response = await api.get(`/api/v1/users/username/${userName}`);
    return response;
  } catch (error) {
    return false;
  }
}

export async function validateEmail(userName) {
  try {
    const response = await api.get(`/api/v1/users/email/${userName}`);
    return response;
  } catch (error) {
    return false;
  }
}

// Inventory

export async function getAllInventories(userId, headers) {
  try {
    const response = await api.get(`/api/v1/inventories/allInventories/${userId}`, headers);
    return response;
  } catch (error) {
    return null;
  }
}

export async function getInventory(id, headers) {
  try{
    const response = await api.get(`/api/v1/inventories/${id}`, headers);
    return response;
  }
  catch (error) {
    return null;
  }
}

export async function createInventory(userId, data, headers) {
  try {
    const response = await api.post(`/api/v1/inventories/created/${userId}`, data, headers);
    if (response.status !== 201) {
      return false;
    }
    else{
      return response;
    }

  } catch (error) {
    return false;
  }
}

export async function updateInventory(id, headers) {
  try{
    const response = await api.put(`/api/v1/inventories/update/${id}`, headers);
    return response;
  }
  catch (error) {
    return null;
  }
}


export async function deleteInventory(id, headers) {
  try{
    const response = await api.delete(`/api/v1/inventories/delete/${id}`, headers);
    return response;
  }
  catch (error) {
    return null;
  }
}

// Update User Data
export async function updateUserData (userId, data, headers) {
  try{
    const response = await api.put(`/api/v1/users/${userId}`, data, headers);
    return response;
  }
  catch (error) {
    return false;
  }
}


// Item
export async function getAllItems(id, headers) {
  try {
    const response = await api.get(`/api/v1/items/allItems/${id}`, headers);
    return response;
  } catch (error) {
    return null;
  }
}


export async function getItem(id, headers) {
  try {
    const response = await api.get(`/api/v1/items/${id}`, headers);
    return response;
  } catch (error) {
    return null;
  }
}

export async function createItem(id, data, headers) {
  try {
    const response = await api.post(`/api/v1/items/created/${id}`, data, headers);
    if (response.status !== 201) {
      return false;
    }
    else{
      return response;
    }

  } catch (error) {
    return false;
  }
}


export async function deleteItem(id, headers) {
  try{
    const response = await api.delete(`/api/v1/items/delete/${id}`, headers);
    return response;
  }
  catch (error) {
    return null;
  }
}

// Transaction

export async function getAllTransactions(id, headers) {
  try {
    const response = await api.get(`/api/v1/transaction/allTransactions/${id}`, headers);
    return response;
  } catch (error) {
    return null;
  }
}


export async function createEntryTransaction(id, data, headers) {
  try {
    const response = await api.post(`/api/v1/transaction/created/entry/${id}`, data, headers);
    if (response.status !== 201) {
      return false;
    }
    else{
      return response;
    }
  } catch (error) {
    return false;
  }
}

export async function createOutputTransaction(id, data, headers) {
  try{
    const response = await api.post(`/api/v1/transaction/created/output/${id}`, data, headers);
    if (response.status !== 201) {
      return false;
    }
    else{
      return response;
    }
  } catch (error) {
    return false;
  }
}


// Styles - Validate TextFields
export const changeTextFieldStyles = (isError, colorError, colorGrey, color) => ({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: isError ? colorError : colorGrey,
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: isError ? colorError : color,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: isError ? colorError : color,
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: isError ? colorError : color,
  },
  "& .MuiFormHelperText-root.Mui-focused": {
    color: isError ? colorError : color,
  },
  "& .MuiInputLabel-asterisk": {
    color: isError ? colorError : color,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: isError ? colorError : color,
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    color: isError ? colorError : color,
  },
  "& .MuiInputBase-input::placeholder": {
    color: isError ? colorError : color,
  },
  "& .MuiInputLabel-formControl" : {
    color: isError ? colorError : color,
  },
  "& .MuiSvgIcon-root": {
    color: isError ? colorError : color,
  }
})

// Alert
export const topSnackbarPosition = {
  vertical: 'top',
  horizontal: 'center',
};

// Style adiciona estoque
export const userInventoryTextFieldStyles = (colorDefault, colorOrange) => ({

  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: colorDefault,
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: colorDefault,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: colorDefault,
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: colorDefault,
  },
  "& .Mui-required": {
    color: colorDefault,
  },
  "& .MuiInputLabel-asterisk": {
    color: colorDefault,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colorDefault,
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    color: colorDefault,
  },
  "& .MuiInputBase-input": {
    color: colorDefault,
  },
  "& .MuiInputLabel-formControl": {
    color: colorDefault,
  },
  "& .MuiSvgIcon-root": {
    color: colorDefault,
  },
  "& .MuiOutlinedInput-root": {
    color: colorDefault,
  },
  "& .MuiInputBase-root": {
    '&:hover': {
      borderColor: `${colorOrange}`,
    },
    '&.Mui-active': {
      borderColor: `${colorOrange}`,
    },
    '&.MuiInputBase-root:focus': {
      borderColor: `${colorOrange}`,
    },
    "& .Mui-focusVisible": {
      borderColor: `${colorOrange}`,
    }
  },
});

// Style Capitalize first letter
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};