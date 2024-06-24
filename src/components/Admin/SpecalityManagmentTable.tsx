 

import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

interface TableRow {
  name: string;
  specalityName: string;
}

const TABLE_HEAD: string[] = ['Image',"specality Name", 'Action'];
const TABLE_ROWS: TableRow[] = [
  { name: 'John Doe',specalityName:"cardiology"},
  { name: 'Jane Smith',specalityName:"cdredionly" }
  // Add more rows as needed
];

const MyComponent: React.FC = () => {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left justify-between">
        <thead >
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name,specalityName }, index) => (
            <tr
              key={name}
            //   className={index % 2 === 0 ? 'bg-blue-gray-50/50' : ''}
            className='mx-auto justify-between'
            >
              <td className="p-4">
                <Typography variant="body2" color="textSecondary" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="body2" color="textSecondary" className="font-normal">
                  {specalityName}
                </Typography>
              </td>
              <td className="p-4">
                {/* Consider adding an anchor tag with appropriate styling (Tailwind CSS or custom CSS) */}
                <Typography component="a" href="#" variant="body2" color="primary" className="font-medium p-4">
                  Edit
                </Typography>
                <Typography component="a" href="#" variant="body2" color="primary" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default MyComponent;
