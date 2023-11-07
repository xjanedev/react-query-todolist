import { useMemo } from "react";

function CheckList({ todos }) {
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter(todo => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className='pt-14'>
      <h4 className='pb-4'>Notes</h4>
      <div className='border-b border-gray-300 pb-2 flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-4 h-4 mr-2 text-green-500'
        >
          <path
            fillRule='evenodd'
            d='M4.293 11.293a1 1 0 011.414-1.414L9 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6z'
            clipRule='evenodd'
          />
        </svg>
        <span className='text-gray-400 text-sm'>전체 할일:</span>
        <span className='pl-2 text-gray-500'>{totalCount}</span>
      </div>
      <div className='border-b border-gray-300 py-2 flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-4 h-4 mr-2 text-green-500'
        >
          <path
            fillRule='evenodd'
            d='M4.293 11.293a1 1 0 011.414-1.414L9 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6z'
            clipRule='evenodd'
          />
        </svg>
        <span className='text-gray-400 text-sm'>완료된 할일:</span>
        <span className='pl-2 text-gray-500'>{doneCount}</span>
      </div>
      <div className='py-2 flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-4 h-4 mr-2 text-green-500'
        >
          <path
            fillRule='evenodd'
            d='M4.293 11.293a1 1 0 011.414-1.414L9 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6z'
            clipRule='evenodd'
          />
        </svg>
        <span className='text-gray-400 text-sm'>미완료된 할일:</span>
        <span className='ml-2 text-gray-500'>{notDoneCount}</span>
      </div>
    </div>
  );
}

export default CheckList;
