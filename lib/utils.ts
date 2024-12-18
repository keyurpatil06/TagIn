import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const authFormSchema = (type: string) => z.object({
  // sign-up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  // both
  email: z.string().email(),
  password: z.string().min(8),
});

export const newEventFormSchema = () => z.object({
  title: z.string().min(3),
  email: z.string().min(3),
  date: z.string().min(3),
  city: z.string().min(3),
  description: z.string().min(3),
  bannerImage: z.custom<File[]>(),
  organizedBy: z.string().min(1),
  location: z.string().min(3),
  time: z.string(),
  price: z.string().regex(/^\d+$/, 'Must be a valid number').transform((value) => parseFloat(value)),
  tags: z.string(),
  performers: z.string().min(3),
});