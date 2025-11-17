import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  allowFutureDates?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  allowFutureDates = false,
}: DatePickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const date = value;

  const getMaxDate = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return today;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onChange?.(selectedDate);
    setOpen(false);
  };

  const maxDate = allowFutureDates ? undefined : getMaxDate();

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="date" className="px-1">
        Date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            name="date"
            className="w-full justify-between font-normal bg-transparent"
            type="button"
          >
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            disabled={maxDate ? { after: maxDate } : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
