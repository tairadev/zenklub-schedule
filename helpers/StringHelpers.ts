export const formatDateToISOString = (dateString: string | null): string => {
  if (!dateString) {
    throw new Error('Selecione uma data.');
  }

  const [date, time] = dateString.split(' ');
  const [day, month, year] = date.split('/');
  const [hour, minute] = time.split(':');

  const isoDate = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      0,
      0
    )
  );

  return isoDate.toISOString();
};

export const isValidCPF = (cpf: string): boolean => {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
};

export const isValidName = (name: string): boolean => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
  return regex.test(name.trim());
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return regex.test(phone);
};

export const getWeekDay = (data: string) => {
  const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  const [day, month, year] = data.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return weekDays[date.getDay()];
};

export const getMonth = (data: string) => {
  const months = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];
  const month = parseInt(data.split('/')[1], 10);
  return months[month - 1];
};
