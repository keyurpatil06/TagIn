import React from 'react';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { newEventFormSchema } from '@/lib/utils';

const formSchema = newEventFormSchema();

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const EventCustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  const isFileInput = name === 'bannerImage';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label whitespace-nowrap">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              {isFileInput ? (
                <input
                  type="file"
                  className="input-class"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              ) : (
                // @ts-ignore
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  type={name === 'price' ? 'number' : name === 'time' ? 'time' : 'text'}
                  {...field}
                />
              )}
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default EventCustomInput;
