'use client';

import DialogModal from '@/components/modals/dialog-modal';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/ui/DatePicker';

export default function ExpenseHeader() {
  return (
    <header className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Expenses
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Track and review your spending
        </p>
      </div>
      <DialogModal
        title="Add Expense"
        description="Enter the details for your new expense."
        triggerBtnText="Add Expense"
        footerBtnText="Add Expense"
      >
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Coffee, Groceries"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Additional notes about this expense (optional)"
            rows={3}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="amount">Amount</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>RM</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Select name="category">
            <SelectTrigger id="category">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food & Dining">Food & Dining</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="paymentMethod">Payment Method</FieldLabel>
          <Select name="paymentMethod">
            <SelectTrigger id="paymentMethod">
              <SelectValue placeholder="Choose payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Debit Card">Debit Card</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Insurance">Insurance</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="date">Date</FieldLabel>
          <DatePicker />
        </Field>
      </DialogModal>
    </header>
  );
}
