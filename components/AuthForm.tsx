'use client'

import { authFormSchema } from "@/lib/utils"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useState } from "react";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Loader2 } from 'lucide-react';
import AuthCustomInput from "./AuthCustomInput";

const AuthForm = ({ type }: { type: string }) => {
  const formSchema = authFormSchema(type);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      // sign-in with appwrite

      if (type === 'sign-up') {
        const userData = {
          email: data.email,
          password: data.password,
          firstName: data.firstName!,
          lastName: data.lastName!,
          city: data.city!,
          state: data.state!,
          dateOfBirth: data.dateOfBirth!,
        }

        const newUser = await signUp(userData);
        if (newUser) router.push('/');

        setUser(newUser);
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push('/');
      }

    } catch (error) {
      console.log(error)
    } finally {
      console.log(data);
      setIsLoading(false)
    }
  }

  return (
    <section className='flex flex-col w-full max-w-md min-h-screen justify-center gap-6 max-md:px-8'>
      <header className='flex flex-col items-start gap-6'>
        <Link href='/' className='text-2xl font-semibold bg-slate-950 text-white rounded-xl px-4 py-1 w-fit'>
          <span className="text-red-500">Tag</span>In
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-3xl font-semibold">
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-lg font-normal text-gray-600">
              Please enter your details
            </p>
          </h1>
        </div>
      </header>

      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {type === 'sign-up' && (
              <>
                <div className="flex gap-4">
                  <AuthCustomInput
                    control={form.control}
                    name='firstName'
                    label='First Name'
                    placeholder='Enter your first name'
                  />
                  <AuthCustomInput
                    control={form.control}
                    name='lastName'
                    label='Last Name'
                    placeholder='Enter your last name'
                  />
                </div>
                <div className="flex gap-4">
                  <AuthCustomInput
                    control={form.control}
                    name='city'
                    label='City'
                    placeholder='Enter your city'
                  />
                  <AuthCustomInput
                    control={form.control}
                    name='state'
                    label='State'
                    placeholder='Ex: NY'
                  />
                </div>
                <AuthCustomInput
                  control={form.control}
                  name='dateOfBirth'
                  label='Date of Birth'
                  placeholder='YYYY-MM-DD'
                />
              </>
            )}

            <AuthCustomInput
              control={form.control}
              name='email'
              label='Email'
              placeholder='Enter your email'
            />
            <AuthCustomInput
              control={form.control}
              name='password'
              label='Password'
              placeholder='Enter your password'
            />
            <div className='flex flex-col gap-4'>
              <Button type="submit" className='text-lg py-2 px-4 bg-red-500 text-white' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className='animate-spin' />&nbsp;Loading...
                  </>
                ) : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
                }
              </Button>
            </div>
          </form>
        </Form>

        <footer className="flex justify-center items-center gap-1">
          <p className='text-14 font-normal text-gray-600'>
            {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"
            }
          </p>
          <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='text-lg text-red-500 font-semibold'>
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </footer>
      </>
    </section>
  )
}

export default AuthForm