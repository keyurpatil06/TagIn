'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { newEventFormSchema } from '@/lib/utils';

const NewEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: 0,
    tags: '',
    performers: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = newEventFormSchema();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: '',
      city: '',
      description: '',
      imgURL: '',
      organizedBy: [],
      location: '',
      time: '',
      price: '',
      tags: [],
      performers: [],
      attendeesCount: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      // create-event with appwrite
      try {
        setIsLoading(true)

        
      } catch (error) {
        console.log(error)
      }

      // if (response) router.push('/');
    }

    } catch (error) {
    console.log(error)
  } finally {
    console.log(data);
    setIsLoading(false)
  }
}

return (
  <div className='max-w-xl mx-auto bg-slate-800 p-6 rounded-lg shadow-lg'>
    <h1 className='text-2xl font-bold mb-6 text-white'>Create New Event</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {type === 'sign-up' && (
          <>
            <div className="flex gap-4">
              <CustomInput
                control={form.control}
                name='firstName'
                label='First Name'
                placeholder='Enter your first name'
              />
              <CustomInput
                control={form.control}
                name='lastName'
                label='Last Name'
                placeholder='Enter your last name'
              />
            </div>
            <div className="flex gap-4">
              <CustomInput
                control={form.control}
                name='city'
                label='City'
                placeholder='Enter your city'
              />
              <CustomInput
                control={form.control}
                name='state'
                label='State'
                placeholder='Ex: NY'
              />
            </div>
            <CustomInput
              control={form.control}
              name='dateOfBirth'
              label='Date of Birth'
              placeholder='YYYY-MM-DD'
            />
          </>
        )}

        <CustomInput
          control={form.control}
          name='email'
          label='Email'
          placeholder='Enter your email'
        />
        <CustomInput
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
  </div>
)
}

export default NewEvent