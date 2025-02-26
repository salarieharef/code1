// Type imports
import { SimpleTableProps } from "@/types/about";

const AboutSimpleTable = ({ data }: SimpleTableProps) => {
  return (
    <div>
      <p className='mb-3 py-2.5 text-center text-sm font-bold md:text-lg md:font-semibold'>
        {data.title}
      </p>
      <table className='w-full border-collapse border border-slate-300'>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className='bg-blue-400 p-3 font-medium text-background'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className='border-b border-slate-300'>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className='p-3 text-center'>
                  {cell ? cell : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AboutSimpleTable;
