import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

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
  date: z.string().min(3),
  city: z.string().min(3),
  description: z.string().min(3),
  imgURL: z.string().optional(),
  organizedBy: z.array(z.string()).min(1),
  location: z.string().min(3),
  time: z.string(),
  price: z.string().optional(),
  tags: z.array(z.string()).optional(),
  performers: z.array(z.string()).min(1),
  attendeesCount: z.string().optional(),
});