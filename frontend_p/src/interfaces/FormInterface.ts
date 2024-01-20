export interface InputParams
extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">
{
  id: number;
  label: string
  name: string;
  errors: string[];
}