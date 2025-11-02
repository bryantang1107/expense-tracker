'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/ui/DatePicker';

export default function ExpenseFilters() {
  return (
    <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input id="title" type="text" placeholder="Coffee, Groceries" />
      </Field>
      <Field>
        <FieldLabel>Category</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <DatePicker />
    </section>
  );
}
