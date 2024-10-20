import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

export default function Component() {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted name:', name)
    // Add your form submission logic here
  }

  return (
    <div>
    <Navbar />
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
      <Card className="w-full max-w-md mx-auto bg-gray-900/60 backdrop-blur-md shadow-2xl border border-gray-700 rounded-xl transition-all duration-300 hover:shadow-purple-500/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-100">Create Profile</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    <Footer />
    </div>
  )
}