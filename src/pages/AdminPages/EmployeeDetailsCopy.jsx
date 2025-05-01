import { useState } from 'react';
import { X, Mail, Phone, MapPin, Clock, Calendar, ExternalLink, ChevronLeft } from 'lucide-react';

export default function EmployeeDetail() {
  const [showModal, setShowModal] = useState(true);
  
  // Sample employee data
  const employee = {
    id: 1,
    name: 'Ralph Edwards',
    image: '/api/placeholder/96/96',
    email: 'ralph@gmail.com',
    phone: '+1 (555) 123-4567',
    location: 'London, UK',
    department: 'Design',
    joinDate: 'March 15, 2022',
    projects: [
      {
        id: 1,
        name: 'Task Management App',
        progress: 90,
        status: 'Completed',
        statusColor: 'bg-green-500',
        progressColor: 'bg-emerald-400',
        dueDate: '15/08/2023'
      },
      {
        id: 2,
        name: 'Social Media App',
        progress: 100,
        status: 'Completed',
        statusColor: 'bg-green-500',
        progressColor: 'bg-emerald-400',
        dueDate: '28/10/2023'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Design homepage wireframes',
        status: 'Completed',
        statusColor: 'bg-green-500',
        dueDate: '05/08/2023',
        priority: 'High'
      },
      {
        id: 2,
        title: 'Create user flow diagrams',
        status: 'Completed',
        statusColor: 'bg-green-500',
        dueDate: '12/08/2023',
        priority: 'Medium'
      },
      {
        id: 3,
        title: 'Design mobile app screens',
        status: 'In Progress',
        statusColor: 'bg-blue-500',
        dueDate: '05/09/2023',
        priority: 'High'
      }
    ],
    performanceMetrics: {
      tasksCompleted: 24,
      projectsDelivered: 5,
      avgTaskCompletion: '2.3 days',
      onTimeDelivery: '94%'
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={handleClose} className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft size={16} className="mr-1" />
            Back to List
          </button>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Employee Profile */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex flex-col items-center">
                <img src={employee.image} alt={employee.name} className="h-24 w-24 rounded-full" />
                <h2 className="mt-4 text-xl font-bold">{employee.name}</h2>
                <p className="text-gray-500">{employee.department}</p>
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline">
                      {employee.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone size={16} className="text-gray-500 mr-2" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <span>{employee.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <span>Joined: {employee.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Tasks Completed</p>
                  <p className="text-xl font-bold">{employee.performanceMetrics.tasksCompleted}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Projects Delivered</p>
                  <p className="text-xl font-bold">{employee.performanceMetrics.projectsDelivered}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Avg. Completion</p>
                  <p className="text-xl font-bold">{employee.performanceMetrics.avgTaskCompletion}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">On-time Delivery</p>
                  <p className="text-xl font-bold">{employee.performanceMetrics.onTimeDelivery}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Projects and Tasks */}
          <div className="md:col-span-2">
            {/* Current Projects */}
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
              <h3 className="font-semibold mb-4">Current Projects</h3>
              <div className="space-y-4">
                {employee.projects.map(project => (
                  <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <span className={`${project.statusColor} px-2 py-1 rounded-full text-xs text-white`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div 
                          className={`${project.progressColor} h-2 rounded-full`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <div className="flex items-center text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>Due: {project.dueDate}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <span className="mr-1">View Details</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Assigned Tasks */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Assigned Tasks</h3>
                <button className="text-blue-600 text-sm hover:text-blue-800">+ Assign New Task</button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employee.tasks.map(task => (
                    <tr key={task.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`${task.statusColor} px-2 py-1 rounded-full text-xs text-white`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {task.dueDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {task.priority}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}