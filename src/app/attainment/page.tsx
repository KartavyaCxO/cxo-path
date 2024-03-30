// pages/attainment.tsx
"use client";

import { FC, useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  // Dummy data - replace with actual data
  { name: 'Week of 8 Jan', ARR: 40000, quota: 80000 },
  { name: 'Week of 22 Jan', ARR: 70000, quota: 80000 },
  // ... more data points
];

const QuotaChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ARR" stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="quota" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
const TotalDealsCard: React.FC<{ totalDeals: number }> = ({ totalDeals }) => {
  return (
    <div className="p-4 bg-white  text-center">
      <h3 className="text-lg font-medium">Total Closed/Won Deals</h3>
      <p className="text-3xl font-bold">{totalDeals}</p>
      <p className="text-sm text-gray-600">This Quarter</p>
    </div>
  );
};

const AttainmentOverviewCard: React.FC<{ percentage: number }> = ({ percentage }) => {
  const circleStyle = {
    strokeDasharray: `${percentage}, 100`
  };

  return (
    <div className="bg-white p-4  text-center flex flex-col items-center">
      <h3 className="text-lg font-medium mb-2">Attainment Overview</h3>
      <svg viewBox="0 0 36 36" className="w-24 h-24">
        <path
          className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#ececec"
          strokeWidth="3.8"
        ></path>
        
        <path
          className="circle"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#0C4A6E"
          strokeWidth="3.8"
          style={circleStyle}
        ></path>
      </svg>
      <div className="text-sm text-gray-600 mt-2">Quarterly Target</div>
    </div>
  );
};

interface ProgressProps {
  percentage: number;
}

const ProgressBar: FC<ProgressProps> = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 border-dotted border-t border-black">
      <div className={`bg-yellow-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full`} style={{ width: `${percentage}%` }}>{percentage}%</div>
    </div>
  );
};

const OptionsDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
        {/* Icon or text for dropdown button */}
        <span>⋮</span>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Override deal value</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Move to Pipeline</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Move to Closed/Lost</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
          </div>
        </div>
      )}
    </div>
  );
};
interface SummaryRowProps {
  totalDeals: number;
  totalARR: number;
}

const SummaryRow: FC<SummaryRowProps> = ({ totalDeals, totalARR }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-2 py-4">
      <div className="flex-1 text-gray-600">Total</div>
      <div className="flex-1"></div> {/* Placeholder for empty cell */}
      <div className="flex-1"></div> {/* Placeholder for empty cell */}
      <div className="flex-1 text-gray-600">{totalDeals} Deals</div>
      <div className="flex-1 text-gray-600">${totalARR.toLocaleString()}</div>
      <div className="flex-1"></div> {/* Placeholder for the checkbox and menu */}
    </div>
  );
};



interface Deal {
  id: string;
  dateRange: string;
  date: string;
  locked: boolean;
  source: string;
  dealCount: string;
  dealColorClass: string;
  dealType: string;
  arr: number;
}

interface DealsListProps {
  title: string;
  deals: Deal[];
}

const DealRow: FC<Deal> = ({ dateRange, date, locked, source, dealCount, dealColorClass, dealType, arr }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">{dateRange || date}</div>
      <div className="flex-1">{locked ? 'Locked' : 'Open'}</div>
      <div className="flex-1">{source}</div>
      <div className="flex items-center flex-1">
        {dealCount}
        <span className={`h-2 w-2 ${dealColorClass} rounded-full ml-2`}></span>
        {dealType}
      </div>
      <div className="flex-1">${arr.toLocaleString()}</div>
      <div className="flex items-center justify-center flex-1 space-x-2">
        <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-600" />
        <OptionsDropdown />
      </div>
    </div>
  );
};

const DealsList: FC<DealsListProps> = ({ title, deals }) => {
  const totalDeals = deals.length;
  const totalARR = deals.reduce((acc, deal) => acc + deal.arr, 0);
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 my-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <div>
        {/* Headers */}
        <div className="flex justify-between text-sm font-bold text-gray-500 py-2 border-b">
          <div className="flex-1">Date</div>
          <div className="flex-1">Locked</div>
          <div className="flex-1">Source</div>
          <div className="flex-1">Deals</div>
          <div className="flex-1">ARR</div>
          <div className="flex-1 ">
            <div className="flex items-center justify-center flex-1 space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-600" />
              <OptionsDropdown />
            </div>
          </div>
        </div>
        {/* Deal rows */}
        <SummaryRow totalDeals={totalDeals} totalARR={totalARR} /> {/* Summary row */}

        {deals.map(deal => (
          <DealRow key={deal.id} {...deal} />
        ))}
      </div>
    </div>
  );
};


export default function Attainment() {
  // Dummy data
  const commission = 50000;
  const quota = 150000;
  const totalDeals = 2
  const percentage = Math.round((commission / quota) * 100);
  const [selectedMember, setSelectedMember] = useState('Sample Member 1');
  const members = ['Sample Member 1', 'Sample Member 2', 'Sample Member 3'];

  // Dummy data, replace with real data as needed
  const closedWonDeals = [
    {
      id: 'deal-1',
      dateRange: 'Jan 10, 2024-Jan 18, 2024',
      date: '',
      locked: false,
      source: 'SAMPLE DEAL - Orange',
      dealCount: '2 Deals',
      dealColorClass: 'bg-orange-500',
      dealType: '',
      arr: 50000,
    },
    {
      id: 'deal-1',
      dateRange: 'Jan 10, 2024-Jan 18, 2024',
      date: '',
      locked: false,
      source: 'SAMPLE DEAL - Orange',
      dealCount: '2 Deals',
      dealColorClass: 'bg-orange-500',
      dealType: '',
      arr: 50000,
    },
    // ...more deals
  ];

  const pipelineDeals = [
    {
      id: 'deal-1',
      dateRange: 'Jan 10, 2024-Jan 18, 2024',
      date: '',
      locked: false,
      source: 'SAMPLE DEAL - Orange',
      dealCount: '2 Deals',
      dealColorClass: 'bg-orange-500',
      dealType: '',
      arr: 50000,
    },
    // ...pipeline deals
  ];
  const closedLostDeals = [
    {
      id: 'deal-1',
      dateRange: 'Jan 10, 2024-Jan 18, 2024',
      date: '',
      locked: false,
      source: 'SAMPLE DEAL - Orange',
      dealCount: '2 Deals',
      dealColorClass: 'bg-orange-500',
      dealType: '',
      arr: 50000,
    },
    // ...pipeline deals
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">Attainment</div>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Add deal
        </button>
      </div>

      <div className="flex gap-10 mb-6">
        <div className="font-semibold">Individual</div>
        <div className="font-semibold">Leaderboard</div>
      </div>

      <div className="flex justify-between items-center ">
        <div className="flex gap-4">
          <select className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-900 focus:outline-none" aria-label=".form-select-lg example">
            <option selected>This Quarter</option>
            <option value="1">Q1</option>
            <option value="2">Q2</option>
            <option value="3">Q3</option>
            <option value="4">Q4</option>
          </select>
          <select className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-900 focus:outline-none" aria-label=".form-select-lg example">
            <option selected>All</option>
            {/* Add other options here */}
          </select>
          <select className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-900 focus:outline-none" aria-label=".form-select-lg example">
            <option selected>All</option>
            {/* Add other options here */}
          </select>
        </div>
        <div>
          <button className="bg-transparent hover:bg-blue-500 text-sky-900 font-semibold hover:text-white py-2 px-4 border border-sky-900  hover:border-transparent rounded">
            Forecast Pipeline
          </button>
        </div>
      </div>
      <div className="mb-6 w-[25vw]">
        <div className="flex items-center space-x-3">
          <span className="font-semibold">View as:</span>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="form-select block  w-[10vw] mt-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
          >
            {members.map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
          <Link href="/member-details" className="text-sky-900 hover:text-blue-800 visited:text-purple-600">
            View Member Details
          </Link>
        </div>

      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-[24vw] mb-[10vh]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">Monthly Quota Commission</div>

        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">
            <div className="">
              ${commission.toLocaleString()}
            </div>
            <div className=" border-dotted border-t border-black">ARR</div>
          </div>
          <div className="text-xl font-bold">
            <div className="">
              ${quota.toLocaleString()} Quota
            </div>
            <div className=" border-dotted border-t border-black">ARR</div>

          </div>
        </div>
        <ProgressBar percentage={percentage} />
      </div>
      <div className="flex">
        {/* ... other components */}
        <QuotaChart />
        <div className="w-1/4 space-y-4">
          <TotalDealsCard totalDeals={2} /> {/* Pass the actual total deals here */}
          <AttainmentOverviewCard percentage={75} />
        </div>
        {/* ... other components */}
      </div>

      <div className="container mx-auto p-6">
        <DealsList title="Closed/Won" deals={closedWonDeals} />
        <DealsList title="Pipeline" deals={pipelineDeals} />
        <DealsList title="Closed/Lost" deals={closedLostDeals} />
      </div>
    </div>
  );
}
