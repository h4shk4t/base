
'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

type User = {
  id: number
  name: string
  email: string
  role: string
  projects: number
  tasks: number
  performance: number
  bio: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Developer',
    projects: 5,
    tasks: 23,
    performance: 92,
    bio: 'Full-stack developer with 5 years of experience in React and Node.js.'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Designer',
    projects: 3,
    tasks: 15,
    performance: 88,
    bio: 'UI/UX designer specializing in creating intuitive and accessible interfaces.'
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'Project Manager',
    projects: 8,
    tasks: 42,
    performance: 95,
    bio: 'Experienced project manager with a track record of delivering complex projects on time and within budget.'
  },
  // Add more users as needed
]

export default function UserList() {
  const [expandedUser, setExpandedUser] = useState<number | null>(null)

  const toggleExpand = (userId: number) => {
    setExpandedUser(expandedUser === userId ? null : userId)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 rounded-lg shadow-lg bg-gray-900 bg-opacity-70 backdrop-blur-lg">
      <h2 className="text-3xl font-bold mb-6 text-white">Team Members</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 bg-opacity-50 text-left">
              <th className="p-4 text-white font-semibold">Name</th>
              <th className="p-4 text-white font-semibold">Role</th>
              <th className="p-4 text-white font-semibold">Projects</th>
              <th className="p-4 text-white font-semibold">Tasks</th>
              <th className="p-4 text-white font-semibold">Performance</th>
              <th className="p-4 text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <>
                <tr
                  key={user.id}
                  className="bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 ease-in-out cursor-pointer"
                  onClick={() => toggleExpand(user.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-blue-300">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white">{user.role}</td>
                  <td className="p-4 text-white">{user.projects}</td>
                  <td className="p-4 text-white">{user.tasks}</td>
                  <td className="p-4 text-white">{user.performance}%</td>
                  <td className="p-4 text-white">
                    {expandedUser === user.id ? (
                      <ChevronUpIcon className="w-6 h-6" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6" />
                    )}
                  </td>
                </tr>
                {expandedUser === user.id && (
                  <tr className="bg-gray-700 bg-opacity-50">
                    <td colSpan={6} className="p-4">
                      <div className="text-white">
                        <h4 className="text-lg font-semibold mb-2">About {user.name}</h4>
                        <p className="text-sm mb-2">{user.bio}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}