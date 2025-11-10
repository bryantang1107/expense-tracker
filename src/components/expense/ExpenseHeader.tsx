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
import type {
  ExpenseFormData,
  ExpenseCategory,
  PaymentMethod,
} from '@/types/expense';
import { CATEGORY_MAP, PAYMENT_METHOD_MAP } from '@/types/expense';
import { getHeroIcon } from '@/lib/icons';

export default function ExpenseHeader() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<ExpenseFormData>({
    title: '',
    description: '',
    amount: 0,
    category: 'other',
    paymentMethod: 'cash',
    date: undefined,
  });

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
          date: formData.date?.toISOString(),
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
                setFormData({ ...formData, category: value as ExpenseCategory })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CATEGORY_MAP).map((category) => {
                  const Icon = getHeroIcon(category.icon);
                  return (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="paymentMethod">Payment Method</FieldLabel>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod || ''}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  paymentMethod: value as PaymentMethod,
                })
              }
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Choose payment method" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PAYMENT_METHOD_MAP).map((method) => {
                  const image = method.image;
                  return (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex items-center gap-2">
                        {image && (
                          <img
                            src={image}
                            alt={method.label}
                            className="h-4 w-4 object-contain"
                          />
                        )}
                        <span>{method.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>
          <DatePicker
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
          />
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
