import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import { HabitsList } from './HabitsList';
import dayjs from 'dayjs';

interface HabitProps{
  date: Date
  completed?: number
  amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitProps ) {
  const completedPercent = amount > 0 ? Math.round( (completed / amount) * 100) : 0 ;
  
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');
 
  return (
    <Popover.Root>
      <Popover.Trigger 
      className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg', {
        'bg-zinc-900 border-2 border-zinc-800': completedPercent >= 0 && completedPercent < 20,
        'bg-violet-900 border-violet-700': completedPercent >= 20 && completedPercent < 40,
        'bg-violet-700 border-violet-500': completedPercent >= 40 && completedPercent < 60,
        'bg-violet-600 border-violet-500': completedPercent >= 60 && completedPercent < 88,
        'bg-violet-500 border-violet-400': completedPercent >= 88
        
      
      })} 
      />

     <Popover.Portal>
     <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
     <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>


          <ProgressBar progress={completedPercent}/>

          <HabitsList date={date} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
  
