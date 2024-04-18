'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  search: z.string().min(0).max(50),
});

export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get('search') ?? '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/?search=${values.search}`);
    } else {
      router.push('/');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[440px]"
                  placeholder="Filter rooms by keywords, such as typescript, next.js, python"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="mr-2" /> Search
        </Button>

        {query.get('search') && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue('search', '');
              router.push('/');
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
