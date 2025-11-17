'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { useAlertDialog } from '@/contexts/AlertDialogContext';
import type {
  ExpenseFormData,
  ExpenseCategory,
  PaymentMethod,
} from '@/types/expense';
import { CATEGORY_MAP, PAYMENT_METHOD_MAP } from '@/types/expense';
import { getHeroIcon } from '@/lib/icons';

interface ExpenseFormProps {
  initialData: ExpenseFormData;
  mode: 'create' | 'edit';
  expenseId?: number;
  onSubmit: (
    data: ExpenseFormData,
    mode: 'create' | 'edit',
    expenseId?: number
  ) => Promise<void>;
  onDelete?: (expenseId: number) => Promise<void>;
}

export default function ExpenseForm({
  initialData,
  mode,
  expenseId,
  onSubmit,
  onDelete,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openAlertDialog } = useAlertDialog();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData, mode, expenseId);
    setIsSubmitting(false);
  };

  const handleDeleteClick = () => {
    if (!expenseId || !onDelete) return;

    openAlertDialog({
      title: 'Are you sure?',
      description:
        'This action cannot be undone. This will permanently delete this expense from your records.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
      onConfirm: async () => {
        await onDelete(expenseId);
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        id="expense-form"
        className="flex flex-col gap-4 mt-5"
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
              setFormData({
                ...formData,
                category: value as ExpenseCategory,
              })
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
      </form>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="submit"
          form="expense-form"
          variant="outline"
          disabled={isSubmitting}
          className="cursor-pointer bg-transparent"
        >
          {isSubmitting
            ? mode === 'create'
              ? 'Adding...'
              : 'Updating...'
            : mode === 'create'
            ? 'Add Expense'
            : 'Update Expense'}
        </Button>
        {mode === 'edit' && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteClick}
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            Delete Expense
          </Button>
        )}
      </div>
    </>
  );
}
