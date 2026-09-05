import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Problem, ProjectStage, Task, TaskStatus } from '../../types';
import { RolePhotoCard } from '../common/RolePhotoCard';
import {
  GraduationCap,
  Layers,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
  TrendingUp,
  AlertTriangle,
  MoveRight,
  ShieldCheck
} from 'lucide-react';

interface ProjectWorkspaceProps {
  problem: Problem;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ problem }) => {
  const { updateTaskStatus, addTaskToProject, advanceProjectStage } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Research Fellow');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('high');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const stageOrder: ProjectStage[] = ['Research', 'Prototype', 'Pilot', 'Deployed', 'Impact_Verified'];
  const currentStageIndex = stageOrder.indexOf(problem.status as ProjectStage);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTaskToProject(problem.id, {
      title: newTaskTitle,
      assignee: newTaskAssignee,
      status: 'todo',
      priority: newTaskPriority,
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    });

    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const tasks = problem.tasks || [];
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const reviewTasks = tasks.filter(t => t.status === 'review');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="p-6 rounded-lg bg-white border border-[#e5e2db] space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#c25e2e]">
                {problem.id}
              </span>
              <span className="text-xs font-mono text-[#787267]">
                • {problem.district}, {problem.state}
              </span>
            </div>
            <h2 className="text-xl font-bold font-serif text-[#181512]">
              {problem.title}
            </h2>
            <p className="text-xs text-[#575147] max-w-3xl">
              {problem.description}
            </p>
          </div>

          {/* Advance Stage Button */}
          {currentStageIndex < stageOrder.length - 1 && (
            <button
              onClick={() => {
                const nextStage = stageOrder[currentStageIndex + 1];
                advanceProjectStage(problem.id, nextStage);
              }}
              className="px-4 py-2.5 rounded bg-[#c25e2e] hover:bg-[#a94f24] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span>Move to Next Stage: {stageOrder[currentStageIndex + 1]}</span>
              <MoveRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-Stage Stepper */}
        <div className="pt-3 border-t border-[#f0ece2]">
          <div className="grid grid-cols-5 gap-2">
            {stageOrder.map((stg, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={stg}
                  className={`p-2.5 rounded border text-center transition-all ${
                    isCurrent
                      ? 'bg-[#f4f0e6] border-[#c25e2e] text-[#c25e2e] font-bold shadow-sm'
                      : isPast
                      ? 'bg-[#faf8f5] border-[#d5d0c3] text-[#181512]'
                      : 'bg-white border-[#e5e2db] text-[#8c8577] opacity-60'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase">
                    Stage 0{idx + 1}
                  </div>
                  <div className="text-xs font-mono font-bold mt-0.5">
                    {stg.replace('_', ' ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* R&D Lab Verification Photo Banner */}
      <RolePhotoCard
        title={`BIT Mesra R&D Facility · ${problem.title}`}
        district={problem.district}
        category={problem.category}
        aspectRatio="wide"
      />

      {/* Kanban Board Columns */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-serif text-[#181512]">
            Project Task Board
          </h3>
          <button
            onClick={() => setIsAddingTask(true)}
            className="px-3 py-1.5 rounded bg-[#181512] hover:bg-[#3d3933] text-white text-xs font-mono font-semibold uppercase flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Add Task Form Modal / Inline */}
        {isAddingTask && (
          <form
            onSubmit={handleAddTask}
            className="p-4 rounded-lg bg-white border border-[#c25e2e] shadow-sm space-y-3"
          >
            <div className="text-xs font-mono font-bold uppercase text-[#c25e2e]">
              Create New Task
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Task description (e.g. Build test parts, run water test)..."
                className="sm:col-span-2 bg-[#faf8f5] border border-[#d5d0c3] rounded p-2 text-xs text-[#181512] focus:outline-none focus:border-[#c25e2e]"
                required
              />
              <select
                value={newTaskPriority}
                onChange={e => setNewTaskPriority(e.target.value as any)}
                className="bg-[#faf8f5] border border-[#d5d0c3] rounded p-2 text-xs text-[#181512] focus:outline-none focus:border-[#c25e2e]"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="px-3 py-1.5 rounded bg-[#faf8f5] border border-[#d5d0c3] text-xs font-mono text-[#575147]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#c25e2e] text-white text-xs font-mono font-bold uppercase"
              >
                Save Task
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1: To Do */}
          <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0ece2]">
              <span className="text-xs font-mono font-bold uppercase text-[#575147]">
                To Do ({todoTasks.length})
              </span>
            </div>
            <div className="space-y-2.5">
              {todoTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 rounded bg-[#faf8f5] border border-[#e5e2db] space-y-2 text-xs"
                >
                  <div className="font-semibold text-[#181512]">{task.title}</div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#787267]">
                    <span>{task.assignee}</span>
                    <span className="text-amber-800 font-bold uppercase">{task.priority}</span>
                  </div>
                  <button
                    onClick={() => updateTaskStatus(problem.id, task.id, 'in_progress')}
                    className="w-full py-1 text-center rounded bg-white hover:bg-[#f4f0e6] border border-[#d5d0c3] text-[10px] font-mono font-semibold text-[#3d3933]"
                  >
                    Start Task →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0ece2]">
              <span className="text-xs font-mono font-bold uppercase text-[#c25e2e]">
                In Progress ({inProgressTasks.length})
              </span>
            </div>
            <div className="space-y-2.5">
              {inProgressTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 rounded bg-[#faf8f5] border border-[#e5e2db] space-y-2 text-xs"
                >
                  <div className="font-semibold text-[#181512]">{task.title}</div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#787267]">
                    <span>{task.assignee}</span>
                    <span className="text-[#c25e2e] font-bold uppercase">{task.priority}</span>
                  </div>
                  <button
                    onClick={() => updateTaskStatus(problem.id, task.id, 'review')}
                    className="w-full py-1 text-center rounded bg-white hover:bg-[#f4f0e6] border border-[#d5d0c3] text-[10px] font-mono font-semibold text-[#3d3933]"
                  >
                    Send for Review →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: In Review */}
          <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0ece2]">
              <span className="text-xs font-mono font-bold uppercase text-[#575147]">
                Review ({reviewTasks.length})
              </span>
            </div>
            <div className="space-y-2.5">
              {reviewTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 rounded bg-[#faf8f5] border border-[#e5e2db] space-y-2 text-xs"
                >
                  <div className="font-semibold text-[#181512]">{task.title}</div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#787267]">
                    <span>{task.assignee}</span>
                    <span className="text-purple-800 font-bold uppercase">{task.priority}</span>
                  </div>
                  <button
                    onClick={() => updateTaskStatus(problem.id, task.id, 'done')}
                    className="w-full py-1 text-center rounded bg-white hover:bg-emerald-50 border border-[#d5d0c3] text-[10px] font-mono font-semibold text-emerald-800 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Mark as Done</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Done */}
          <div className="p-4 rounded-lg bg-white border border-[#e5e2db] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0ece2]">
              <span className="text-xs font-mono font-bold uppercase text-emerald-800">
                Completed ({doneTasks.length})
              </span>
            </div>
            <div className="space-y-2.5">
              {doneTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 rounded bg-[#f4fbf7] border border-emerald-200 space-y-2 text-xs"
                >
                  <div className="font-semibold text-emerald-950 line-through opacity-80">
                    {task.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800">
                    <span>{task.assignee}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
