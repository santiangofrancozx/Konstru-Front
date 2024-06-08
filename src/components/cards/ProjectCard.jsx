import React from 'react';
import { Button } from '@/components/ui/button';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"

const ProjectCard = ({ title, startDate, status }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">Any Location</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">Started on {startDate}</span>
          </div>
          <div
            className={`px-2 py-1 rounded-full font-medium text-xs ${
              status === 'Active'
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                : status === 'Pending'
                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
            }`}
          >
            {status}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
};

function MapPinIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>)
    );
  }

function CalendarIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>)
    );
  }

export default ProjectCard;
