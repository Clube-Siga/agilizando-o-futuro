export function formatPhoneNumber(value) {
  if (!value) return ''; // Adicionado para tratar o caso de value ser falsy

  const phoneNumber = value.replace(/\D/g, '');

  if (phoneNumber.length < 10) {
    return phoneNumber;
  }

  return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7, 11)}`;
}

export function formatCPF(cpf) {
  // Remove todos os caracteres não numéricos
  const numericValue = cpf.replace(/\D/g, "");

  // Aplica a formatação do CPF (XXX.XXX.XXX-XX) após o CPF completo ser digitado
  if (numericValue.length === 11) {
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return numericValue; 
}