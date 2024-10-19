import { Check, Minus } from 'lucide-react'
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

type User = {
  id: number
  name: string
  role: string
  projects: number
  tasks: number
  performance: number
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', role: 'Developer', projects: 5, tasks: 23, performance: 92 },
  { id: 2, name: 'Bob Smith', role: 'Designer', projects: 3, tasks: 15, performance: 88 },
  { id: 3, name: 'Carol Williams', role: 'Project Manager', projects: 8, tasks: 42, performance: 95 },
  { id: 4, name: 'David Brown', role: 'Developer', projects: 6, tasks: 31, performance: 90 },
  { id: 5, name: 'Eva Martinez', role: 'Designer', projects: 4, tasks: 19, performance: 87 },
]

export default function UserList() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
        <div className="max-w-6xl w-full bg-gray-900/60 backdrop-blur-md shadow-2xl border border-gray-700 rounded-xl transition-all duration-300 hover:shadow-purple-500/20 p-8">
          <div className="text-center space-y-4 mb-8">
            <p className="text-blue-300">Team Overview</p>
            <h2 className="text-4xl font-bold text-white">See all team members</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2 text-left text-gray-300">Name</th>
                  <th className="px-4 py-2 text-center text-gray-300">Role</th>
                  <th className="px-4 py-2 text-center text-gray-300">Projects</th>
                  <th className="px-4 py-2 text-center text-gray-300">Tasks</th>
                  <th className="px-4 py-2 text-center text-gray-300">Performance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/50'}>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-200">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-300">{user.role}</td>
                    <td className="px-4 py-4 text-center text-gray-300">{user.projects}</td>
                    <td className="px-4 py-4 text-center text-gray-300">{user.tasks}</td>
                    <td className="px-4 py-4 text-center text-gray-300">
                      {user.performance >= 90 ? (
                        <Check className="inline-block w-5 h-5 text-green-500" />
                      ) : user.performance >= 80 ? (
                        <Check className="inline-block w-5 h-5 text-yellow-500" />
                      ) : (
                        <Minus className="inline-block w-5 h-5 text-red-500" />
                      )}
                      <span className="ml-2">{user.performance}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}