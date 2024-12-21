'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { newEventFormSchema } from '@/lib/utils';
import EventCustomInput from '@/components/EventCustomInput';
import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FileUploader from '@/components/FileUploader';
import CustomButton from '@/components/Button';
import { createEvent } from '@/lib/actions/event.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const NewEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const formSchema = newEventFormSchema();
  const router = useRouter();

  const getUserId = async () => {
    const user = await getLoggedInUser();
    return user.$id;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formSchema,
      title: '',
      email: '',
      city: '',
      description: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data)
    setIsLoading(true)

    let formData;

    if (data.bannerImage && data.bannerImage.length > 0) {
      const blobFile = new Blob([data.bannerImage[0]], {
        type: data.bannerImage[0].type,
      })

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', data.bannerImage[0].name);
    }

    try {
      // create-event with appwrite
      const userId = await getUserId();

      const eventData = {
        ...data,
        bannerImage: formData,
        userId,
      }

      const event = await createEvent(eventData);

      if (event) router.push(`/events/new-event/${userId}/success`);

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      // console.log(data)
    }
  }

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    form.setValue('bannerImage', newFiles);
  }

  return (
    <div className='max-w-xl max-md:mx-4 mx-auto mt-28 mb-8 bg-slate-800 text-white p-6 rounded-lg shadow-lg'>
      <h1 className='text-2xl font-bold mb-6 text-white'>Create New Event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <>
            <EventCustomInput
              control={form.control}
              name='title'
              label='Event Title'
              placeholder='Eg: Conferences'
            />
            <EventCustomInput
              control={form.control}
              name='email'
              label='Email'
              placeholder='johndoe@email.com'
            />
            <div className='flex gap-4'>
              <EventCustomInput
                control={form.control}
                name='date'
                label='Event date'
                placeholder='YYYY-MM-DD'
              />
              <EventCustomInput
                control={form.control}
                name='time'
                label='Time'
                placeholder='Event time'
              />
            </div>
            <div>
              <Label htmlFor='desc'>Event description</Label>
              <Textarea
                placeholder='Enter event description'
                {...form.register('description')}
                id='desc'
                className='mt-2'
              />
            </div>
            <div>
              <Label htmlFor='addr'>Address</Label>
              <Textarea
                placeholder='Enter location'
                {...form.register('location')}
                id='addr'
                className='mt-2'
              />
            </div>
            <div className='flex gap-4'>
              <EventCustomInput
                control={form.control}
                name='city'
                label='Enter city'
                placeholder='Mumbai'
              />
              <EventCustomInput
                control={form.control}
                name='price'
                label='Ticket price'
                placeholder='Rs. 1499 (0 for FREE)'
              />
            </div>
            <EventCustomInput
              control={form.control}
              name='tags'
              label='Tags (comma &apos;,&apos; seperated)'
              placeholder='music, EDM, rock, etc.'
            />
            <EventCustomInput
              control={form.control}
              name='organizedBy'
              label='Oragnizers (comma &apos;,&apos; seperated if multiple)'
              placeholder='Organizer&apos;s name'
            />
            <EventCustomInput
              control={form.control}
              name='performers'
              label='Performers (comma &apos;,&apos; seperated if multiple)'
              placeholder='Alan Walker'
            />
          </>
          <div className='flex flex-col gap-2'>
            <Label>Upload event banner</Label>
            <FileUploader files={files} onChange={handleFileChange} />
          </div>

          <CustomButton
            text='Create Event'
            isLoading={isLoading}
            type='submit'
            className='w-full rounded-lg bg-red-500 text-base'
          />
        </form>
      </Form>
    </div>
  )
}

export default NewEvent