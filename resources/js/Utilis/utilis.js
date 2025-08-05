 // utils.js
 export function formatPhoneNumber(value) {
    if (!value) return ''; // Adicionado para tratar o caso de `value` ser falsy
  
    const phoneNumber = value.replace(/\D/g, '');
    
    if (phoneNumber.length < 10) {
      return phoneNumber;
    }
  
    return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7, 11)}`;
  }