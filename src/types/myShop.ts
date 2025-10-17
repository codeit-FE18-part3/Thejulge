interface RegisterFormData {
  name: string;
  category?: string;
  address1?: string;
  address2: string;
  originalHourlyPay: number | string;
  description?: string;
  image: File | null;
  imageUrl?: string;
}

export default RegisterFormData;
