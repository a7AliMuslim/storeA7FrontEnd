import { Field, Input } from '@headlessui/react';
import clsx from 'clsx';
import {memo} from 'react';

function Example() {
  return (
    <div className="w-full px-4">
      <Field>
        <Input
          className={clsx(
            'block w-full rounded-lg border-none bg-white/20 py-1.5 px-3 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
        />
      </Field>
    </div>
  )
}

export default memo(Example);