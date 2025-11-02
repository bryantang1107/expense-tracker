'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import type { ExpenseFormData } from '@/types/expense';

export default function ExpenseHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormData>({
    title: '',
    description: '',
    amount: 0,
    category: '',
    paymentMethod: '',
    date: new Date(),
  });
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          amount: Number(formData.amount),
          category: formData.category || undefined,
          paymentMethod: formData.paymentMethod || undefined,
          date: date?.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create expense');
      }

      setOpen(false);

      // Refresh the page to show new expense
      router.refresh();
    } catch (error) {
      alert('Failed to create expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        open={open}
        onOpenChange={setOpen}
        isSubmitting={isSubmitting}
      >
        <form
          onSubmit={handleSubmit}
          id="expense-form"
          className="flex flex-col gap-4"
        >
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Coffee, Groceries"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Additional notes about this expense (optional)"
              rows={3}
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
                value={formData.amount || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select
              name="category"
              value={formData.category || ''}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Housing / Rent / Mortgage">
                  Housing / Rent / Mortgage
                </SelectItem>
                <SelectItem value="Utilities (electricity, water, internet)">
                  Utilities (electricity, water, internet)
                </SelectItem>
                <SelectItem value="Groceries">Groceries</SelectItem>
                <SelectItem value="Transportation (fuel, parking, public transit)">
                  Transportation (fuel, parking, public transit)
                </SelectItem>
                <SelectItem value="Food & Dining (restaurants, cafés, takeout)">
                  Food & Dining (restaurants, cafés, takeout)
                </SelectItem>
                <SelectItem value="Shopping (clothes, gadgets, etc.)">
                  Shopping (clothes, gadgets, etc.)
                </SelectItem>
                <SelectItem value="Entertainment (movies, games, subscriptions)">
                  Entertainment (movies, games, subscriptions)
                </SelectItem>
                <SelectItem value="Health & Fitness (gym, supplements, medical)">
                  Health & Fitness (gym, supplements, medical)
                </SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Loans / Debt Payments">
                  Loans / Debt Payments
                </SelectItem>
                <SelectItem value="Savings / Investments">
                  Savings / Investments
                </SelectItem>
                <SelectItem value="Education (books, courses)">
                  Education (books, courses)
                </SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Gifts / Donations">
                  Gifts / Donations
                </SelectItem>
                <SelectItem value="Other / Miscellaneous">
                  Other / Miscellaneous
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="paymentMethod">Payment Method</FieldLabel>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod || ''}
              onValueChange={(value) =>
                setFormData({ ...formData, paymentMethod: value })
              }
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Choose payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="GrabPay">GrabPay</SelectItem>
                <SelectItem value="Touch 'n Go">Touch 'n Go</SelectItem>
                <SelectItem value="Debit/Credit Card">
                  Debit/Credit Card
                </SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <DatePicker value={date} onChange={setDate} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="hidden"
            aria-hidden="true"
          >
            Submit
          </button>
        </form>
      </DialogModal>
    </header>
  );
}
