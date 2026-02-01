import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, CheckCircle2, XCircle, Clock, Trash2, Users, Calendar, Eye, EyeOff, Folder, FolderOpen, FileText, Archive, Inbox, Send, BookOpen, Target, Lightbulb, AlertTriangle, Coffee, Workflow, Box, Layers, Sparkles, MapPin, Search, ChefHat, LayoutGrid } from 'lucide-react';

// Color palette inspired by the book's professional aesthetic
const colors = {
  primary: '#1a365d',
  secondary: '#2b6cb0',
  accent: '#ed8936',
  success: '#38a169',
  warning: '#d69e2e',
  danger: '#e53e3e',
  neutral: '#718096',
  light: '#f7fafc',
  dark: '#1a202c'
};

// Concept data structure
const concepts = [
  {
    id: 'gemba',
    title: 'Gemba',
    subtitle: 'Go to the Source',
    icon: MapPin,
    color: '#e53e3e',
    tagline: '"You can see a lot just by looking" — Yogi Berra',
    description: 'The place where work is actually done. Going to the gemba means observing reality firsthand.',
    chapter: 1
  },
  {
    id: '5s',
    title: '5S',
    subtitle: 'Organize for Excellence',
    icon: Layers,
    color: '#38a169',
    tagline: 'Sort, Set in Order, Shine, Standardize, Sustain',
    description: 'A systematic approach to workplace organization that makes problems visible.',
    chapter: 2
  },
  {
    id: 'mise-en-place',
    title: 'Mise en Place',
    subtitle: "The Chef's Secret",
    icon: ChefHat,
    color: '#805ad5',
    tagline: '"Work clean!" — Anthony Bourdain',
    description: 'Everything in its place, ready at hand. Your workspace as an extension of your mind.',
    chapter: 2
  },
  {
    id: 'out-of-sight',
    title: 'Out of Sight',
    subtitle: 'The Paradox',
    icon: EyeOff,
    color: '#d69e2e',
    tagline: 'The absurdity of keeping everything visible',
    description: 'Why piling things on your desk actually makes them invisible over time.',
    chapter: 2
  },
  {
    id: 'frequency-organization',
    title: 'Frequency-Based',
    subtitle: 'Organization System',
    icon: Folder,
    color: '#3182ce',
    tagline: 'Working • Reference • Archive',
    description: 'Organize by how often you use it, not by what it is.',
    chapter: 2
  },
  {
    id: 'flow',
    title: 'Flow',
    subtitle: 'Continuous Value',
    icon: Workflow,
    color: '#00b5d8',
    tagline: 'From batch-and-queue to continuous flow',
    description: 'Make value flow continuously without interruptions or backlogs.',
    chapter: 3
  },
  {
    id: '4ds',
    title: 'The 4Ds',
    subtitle: 'Process Everything',
    icon: CheckCircle2,
    color: '#ed8936',
    tagline: 'Do • Delegate • Designate • Discard',
    description: 'A systematic method for processing every item that enters your workspace.',
    chapter: 3
  },
  {
    id: 'daily-work',
    title: 'Daily Processes',
    subtitle: 'Structure Your Day',
    icon: Calendar,
    color: '#667eea',
    tagline: 'Serial tasking beats multitasking',
    description: 'Create predictable routines that free your mind for creative work.',
    chapter: 3
  }
];

// Toggle Section Component
const ToggleSection = ({ title, children, defaultOpen = false, icon: Icon, level = 1 }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const sizes = {
    1: 'text-lg font-semibold',
    2: 'text-base font-medium',
    3: 'text-sm font-medium'
  };
  
  const paddings = {
    1: 'p-4',
    2: 'p-3',
    3: 'p-2'
  };
  
  return (
    <div className={`border-l-2 ${level === 1 ? 'border-blue-500' : level === 2 ? 'border-green-500' : 'border-gray-300'} bg-white rounded-r-lg shadow-sm mb-3`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${paddings[level]} flex items-center justify-between hover:bg-gray-50 transition-colors rounded-r-lg`}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={level === 1 ? 20 : 16} className="text-gray-600" />}
          <span className={sizes[level]}>{title}</span>
        </div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isOpen && (
        <div className={`${paddings[level]} pt-0 border-t border-gray-100`}>
          {children}
        </div>
      )}
    </div>
  );
};

// Visual Example Component
const VisualExample = ({ title, visual, explanation, type = 'info' }) => {
  const bgColors = {
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200'
  };
  
  return (
    <div className={`${bgColors[type]} border rounded-lg p-4 my-3`}>
      <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
        <Lightbulb size={16} className="text-yellow-600" />
        {title}
      </h4>
      <div className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
        {visual}
      </div>
      <p className="text-sm text-gray-700 italic">{explanation}</p>
    </div>
  );
};

// Desk Visual Component
const DeskVisual = ({ cluttered = false }) => {
  return (
    <div className={`relative h-48 rounded-lg ${cluttered ? 'bg-red-100' : 'bg-green-100'} p-4 overflow-hidden`}>
      {/* Desk surface */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-amber-700 rounded-t-lg shadow-inner">
        <div className="absolute inset-x-4 top-2 h-24 bg-amber-600 rounded" />
      </div>
      
      {/* Computer */}
      <div className="absolute bottom-20 left-8 w-16 h-12 bg-gray-700 rounded-sm">
        <div className="w-14 h-9 bg-blue-400 m-1 rounded-sm flex items-center justify-center">
          <span className="text-xs text-white">📊</span>
        </div>
      </div>
      
      {cluttered ? (
        <>
          {/* Scattered papers */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white shadow-sm rounded-sm"
              style={{
                width: `${20 + Math.random() * 15}px`,
                height: `${25 + Math.random() * 15}px`,
                bottom: `${80 + Math.random() * 40}px`,
                left: `${30 + i * 25 + Math.random() * 20}px`,
                transform: `rotate(${Math.random() * 40 - 20}deg)`
              }}
            >
              <div className="w-full h-1 bg-gray-300 mt-1 mx-1" style={{width: '70%'}} />
              <div className="w-full h-1 bg-gray-200 mt-1 mx-1" style={{width: '50%'}} />
            </div>
          ))}
          {/* Post-it notes */}
          <div className="absolute bottom-24 right-8 w-8 h-8 bg-yellow-300 transform rotate-12 shadow" />
          <div className="absolute bottom-28 right-12 w-6 h-6 bg-pink-300 transform -rotate-6 shadow" />
          <div className="absolute bottom-20 right-16 w-7 h-7 bg-blue-300 transform rotate-3 shadow" />
          {/* Coffee cup */}
          <div className="absolute bottom-24 left-28 w-6 h-8 bg-white rounded-b-lg border-2 border-gray-300" />
        </>
      ) : (
        <>
          {/* Organized inbox tray */}
          <div className="absolute bottom-24 right-8 w-12 h-4 bg-gray-400 rounded-sm shadow">
            <span className="text-xs text-white ml-1">IN</span>
          </div>
          {/* Neat stack */}
          <div className="absolute bottom-28 right-10 w-10 h-2 bg-white rounded-sm shadow" />
          <div className="absolute bottom-30 right-10 w-10 h-2 bg-white rounded-sm shadow" style={{bottom: '7.5rem'}} />
        </>
      )}
      
      {/* Label */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${cluttered ? 'bg-red-500' : 'bg-green-500'}`}>
        {cluttered ? '❌ CHAOS' : '✓ ORGANIZED'}
      </div>
    </div>
  );
};

// File Organization Visual
const FileOrgVisual = () => {
  const [activeTab, setActiveTab] = useState('working');
  
  const files = {
    working: [
      { name: 'Current Project Brief', freq: 'Daily', icon: '📝' },
      { name: 'Q4 Budget Review', freq: '3x/week', icon: '💰' },
      { name: 'Client Invoices - Active', freq: 'Weekly', icon: '📄' }
    ],
    reference: [
      { name: 'Company Policies', freq: 'Monthly', icon: '📋' },
      { name: 'Last Year\'s Reports', freq: 'Quarterly', icon: '📊' },
      { name: 'Contact Database', freq: 'As needed', icon: '👥' }
    ],
    archive: [
      { name: 'Tax Returns 2020-2023', freq: 'Rarely', icon: '🗃️' },
      { name: 'Closed Projects', freq: 'Never', icon: '📦' },
      { name: 'Old Contracts', freq: 'Legal hold', icon: '⚖️' }
    ]
  };
  
  const tabColors = {
    working: 'bg-green-500',
    reference: 'bg-blue-500',
    archive: 'bg-gray-500'
  };
  
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex gap-2 mb-4">
        {['working', 'reference', 'archive'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-medium capitalize transition-all ${
              activeTab === tab 
                ? `${tabColors[tab]} text-white` 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {tab === 'working' ? '📁' : tab === 'reference' ? '📚' : '🗄️'} {tab}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-lg p-4 min-h-32">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
          {activeTab === 'working' && '🔥 High frequency - At your fingertips'}
          {activeTab === 'reference' && '📖 Low frequency - Nearby but not cluttering'}
          {activeTab === 'archive' && '🏛️ Rarely/Never - Offsite or deep storage'}
        </div>
        <div className="space-y-2">
          {files[activeTab].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <span className="flex items-center gap-2">
                <span>{file.icon}</span>
                <span className="text-sm">{file.name}</span>
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                activeTab === 'working' ? 'bg-green-100 text-green-700' :
                activeTab === 'reference' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-200 text-gray-600'
              }`}>
                {file.freq}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4D Workflow Visual
const FourDWorkflowVisual = () => {
  const [currentItem, setCurrentItem] = useState(0);
  
  const items = [
    { task: 'Reply to quick question from coworker', decision: 'DO IT', reason: 'Takes < 2 minutes', color: 'green', icon: CheckCircle2 },
    { task: 'Research report for next month', decision: 'DESIGNATE IT', reason: 'Complex task - schedule for Tuesday', color: 'blue', icon: Calendar },
    { task: 'Routine data entry task', decision: 'DELEGATE IT', reason: 'Someone else is better suited', color: 'purple', icon: Users },
    { task: 'Old newsletter from 2 weeks ago', decision: 'DISCARD IT', reason: 'No longer relevant', color: 'red', icon: Trash2 }
  ];
  
  const item = items[currentItem];
  const IconComponent = item.icon;
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
      <div className="flex justify-center gap-4 mb-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentItem(i)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              currentItem === i ? 'bg-blue-500 text-white scale-110' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
      {/* Inbox */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-gray-300">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Inbox size={14} /> Incoming Item
        </div>
        <div className="text-lg font-medium">{item.task}</div>
      </div>
      
      {/* Arrow */}
      <div className="flex justify-center my-2">
        <ChevronDown className="text-gray-400 animate-bounce" size={24} />
      </div>
      
      {/* Decision */}
      <div className={`rounded-lg p-4 border-2 ${
        item.color === 'green' ? 'bg-green-50 border-green-400' :
        item.color === 'blue' ? 'bg-blue-50 border-blue-400' :
        item.color === 'purple' ? 'bg-purple-50 border-purple-400' :
        'bg-red-50 border-red-400'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <IconComponent className={
            item.color === 'green' ? 'text-green-600' :
            item.color === 'blue' ? 'text-blue-600' :
            item.color === 'purple' ? 'text-purple-600' :
            'text-red-600'
          } size={24} />
          <span className="font-bold text-lg">{item.decision}</span>
        </div>
        <p className="text-sm text-gray-600 italic">{item.reason}</p>
      </div>
    </div>
  );
};

// Flow Comparison Visual
const FlowComparisonVisual = () => {
  const [showFlow, setShowFlow] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <button
          onClick={() => setShowFlow(!showFlow)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            showFlow ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {showFlow ? '✓ FLOW (One-Piece)' : '✗ BATCH & QUEUE'}
        </button>
      </div>
      
      <div className="bg-white rounded-lg p-4 border">
        {!showFlow ? (
          <div className="space-y-4">
            <div className="text-center text-sm text-red-600 font-medium mb-4">
              Batch Processing: Work piles up, then processed all at once
            </div>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-lg mb-2">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">📥 Pile of work waiting</span>
              </div>
              <ChevronRight className="text-gray-300" size={32} />
              <div className="text-center">
                <div className="bg-orange-100 p-4 rounded-lg mb-2">
                  <div className="text-2xl">😰</div>
                </div>
                <span className="text-xs text-gray-500">Overwhelmed</span>
              </div>
              <ChevronRight className="text-gray-300" size={32} />
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-2">
                  <div className="text-2xl">🔥</div>
                </div>
                <span className="text-xs text-gray-500">Crisis mode</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-sm text-green-600 font-medium mb-4">
              Continuous Flow: Work processed smoothly, one item at a time
            </div>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-2">
                  <div className="w-6 h-6 bg-green-400 rounded-sm mx-auto" />
                </div>
                <span className="text-xs text-gray-500">📥 One item</span>
              </div>
              <ChevronRight className="text-green-400 animate-pulse" size={32} />
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-2">
                  <div className="text-2xl">🎯</div>
                </div>
                <span className="text-xs text-gray-500">Process it</span>
              </div>
              <ChevronRight className="text-green-400 animate-pulse" size={32} />
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-2">
                  <div className="text-2xl">✅</div>
                </div>
                <span className="text-xs text-gray-500">Done! Next...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Value Stream Map Visual
const ValueStreamVisual = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
      <div className="text-center mb-4">
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          YOU (Factory of One)
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { customer: 'Boss', value: 'Status Reports', color: 'bg-purple-100' },
          { customer: 'Clients', value: 'Solutions', color: 'bg-green-100' },
          { customer: 'Team', value: 'Guidance', color: 'bg-blue-100' },
          { customer: 'Yourself', value: 'Growth', color: 'bg-yellow-100' }
        ].map((item, i) => (
          <div key={i} className={`${item.color} rounded-lg p-3`}>
            <div className="font-bold text-gray-700">{item.customer}</div>
            <div className="text-gray-500 mt-1">needs</div>
            <div className="font-medium text-gray-800">{item.value}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <Target className="inline mr-1" size={14} />
        Focus on <strong>outputs they need</strong>, not inputs you provide
      </div>
    </div>
  );
};

// Time Tracking Visual
const TimeTrackingVisual = () => {
  const activities = [
    { time: '8:30-8:42', activity: 'Read and write email', type: 'incidental', color: 'bg-yellow-100' },
    { time: '8:42-8:50', activity: 'Review budget', type: 'value-added', color: 'bg-green-100' },
    { time: '8:50-9:00', activity: 'Help colleague with slides', type: 'incidental', color: 'bg-yellow-100' },
    { time: '9:00-9:30', activity: 'Prepare target specs', type: 'value-added', color: 'bg-green-100' },
    { time: '9:30-9:35', activity: 'Explain absence to boss', type: 'waste', color: 'bg-red-100' }
  ];
  
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="bg-gray-100 p-3 border-b flex gap-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded" /> Value-Added</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded" /> Incidental</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded" /> Waste</span>
      </div>
      <div className="divide-y">
        {activities.map((act, i) => (
          <div key={i} className={`flex items-center p-3 ${act.color}`}>
            <span className="w-24 text-xs font-mono text-gray-600">{act.time}</span>
            <span className="flex-1 text-sm">{act.activity}</span>
            <span className={`text-xs px-2 py-1 rounded capitalize ${
              act.type === 'value-added' ? 'bg-green-200 text-green-800' :
              act.type === 'incidental' ? 'bg-yellow-200 text-yellow-800' :
              'bg-red-200 text-red-800'
            }`}>
              {act.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Concept Detail Pages
const ConceptDetail = ({ concept, onBack }) => {
  const IconComponent = concept.icon;
  
  const renderContent = () => {
    switch (concept.id) {
      case 'gemba':
        return (
          <div className="space-y-4">
            <ToggleSection title="What is Gemba?" icon={Search} defaultOpen={true} level={1}>
              <p className="text-gray-700 mb-4">
                <strong>Gemba</strong> is a Japanese word that refers to the place where work is actually done. 
                In a factory, the gemba is the production line—not the manager's office. For knowledge workers, 
                your gemba is your desk, your workspace, your actual environment.
              </p>
              
              <VisualExample
                title="Going to YOUR Gemba"
                visual={<TimeTrackingVisual />}
                explanation="Track your activities for a week. This time log IS your gemba observation. You'll be shocked at how little time is truly value-added work. This honest self-observation is the first step to improvement."
                type="info"
              />
            </ToggleSection>
            
            <ToggleSection title="Why Go to the Gemba?" icon={Target} level={1}>
              <p className="text-gray-700 mb-4">
                Lean practitioners are obsessed with going to the gemba because it's only there that you can:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span>Grasp the reality of a situation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span>Fully understand a problem</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span>See the actual waste (not what reports tell you)</span>
                </li>
              </ul>
              
              <ToggleSection title="Example: Customer Service Software" icon={Lightbulb} level={2}>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Only by going to the gemba and <em>seeing</em> customer service reps struggle to navigate 
                    expensive new software can you understand why misshipments have spiked. Without direct 
                    observation, you might think your reps are "sloppy" or "lazy"—when the real problem is 
                    poorly designed screens.
                  </p>
                </div>
              </ToggleSection>
            </ToggleSection>
            
            <ToggleSection title="Customer Value Map" icon={Users} level={1}>
              <p className="text-gray-700 mb-4">
                To identify your real work, you need to identify your various customers and what value they actually need:
              </p>
              <VisualExample
                title="Map Your Value Streams"
                visual={<ValueStreamVisual />}
                explanation="Your boss doesn't want 'status meetings'—they want confidence that projects are on track. Clients don't want 'deliverables'—they want solutions. Focus on the VALUE, not the activity."
                type="success"
              />
            </ToggleSection>
            
            <ToggleSection title="Three Types of Activities" icon={Layers} level={1}>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2">✓ Value-Added</h4>
                  <p className="text-sm text-gray-600 mb-2">Must meet ALL 3 criteria:</p>
                  <ol className="text-sm space-y-1 text-gray-700">
                    <li>1. Customer willing to pay</li>
                    <li>2. Transforms the product</li>
                    <li>3. Done right the first time</li>
                  </ol>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-800 mb-2">~ Incidental</h4>
                  <p className="text-sm text-gray-700">
                    Doesn't move value forward, but necessary to do value-added work. 
                    <em className="block mt-2">Example: Calculating billable hours</em>
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2">✗ Waste</h4>
                  <p className="text-sm text-gray-700">
                    Pure waste. Eliminate it.
                    <em className="block mt-2">Example: Looking for lost files, correcting errors</em>
                  </p>
                </div>
              </div>
            </ToggleSection>
          </div>
        );
        
      case '5s':
        return (
          <div className="space-y-4">
            <ToggleSection title="The 5S Framework" icon={Layers} defaultOpen={true} level={1}>
              <p className="text-gray-700 mb-4">
                5S is the foundation of Lean—not just about "cleaning your room," but about making problems VISIBLE.
              </p>
              
              <div className="space-y-3">
                {[
                  { jp: 'Seiri', en: 'Sort', desc: 'Throw out obsolete and useless items', color: 'red' },
                  { jp: 'Seiton', en: 'Set in Order', desc: 'A place for everything, everything in its place', color: 'orange' },
                  { jp: 'Seiso', en: 'Shine', desc: 'Keep workspace clean + preventive maintenance', color: 'yellow' },
                  { jp: 'Seiketsu', en: 'Standardize', desc: 'Develop consistent organization systems', color: 'green' },
                  { jp: 'Shitsuke', en: 'Sustain', desc: 'Ongoing maintenance of the first four', color: 'blue' }
                ].map((s, i) => (
                  <ToggleSection 
                    key={i} 
                    title={`${i+1}. ${s.en} (${s.jp})`} 
                    level={2}
                    defaultOpen={i === 0}
                  >
                    <p className="text-gray-700">{s.desc}</p>
                  </ToggleSection>
                ))}
              </div>
            </ToggleSection>
            
            <ToggleSection title="5S is NOT..." icon={XCircle} level={1}>
              <div className="grid md:grid-cols-2 gap-4">
                <VisualExample
                  title="Al Gore's Office (NOT 5S)"
                  visual={<DeskVisual cluttered={true} />}
                  explanation="Jumbled papers, no system, unclear workflow. Information is buried and invisible. This is anti-5S."
                  type="danger"
                />
                <VisualExample
                  title="LAME 5S (Also Wrong)"
                  visual={
                    <div className="h-48 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📏</div>
                        <p className="text-sm text-gray-600">Pens aligned at perfect 90° angles</p>
                        <p className="text-xs text-gray-400 mt-1">No sweaters on chairs allowed!</p>
                      </div>
                    </div>
                  }
                  explanation="Rigid rules about sweaters and pen angles is 'Lean As Misguidedly Executed' (LAME). This shackles people to pointless standards that don't improve work."
                  type="warning"
                />
              </div>
            </ToggleSection>
            
            <ToggleSection title="5S IS..." icon={CheckCircle2} level={1}>
              <VisualExample
                title="Real 5S: Find What You Need FAST"
                visual={<DeskVisual cluttered={false} />}
                explanation="Real 5S frees you from hunting for things. It makes abnormalities visible. The goal is speed and clarity, not aesthetic perfection."
                type="success"
              />
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 The Real Test</h4>
                <p className="text-sm text-gray-700">
                  Can someone else find what they need in your workspace in your absence? 
                  Does work flow smoothly when you're on vacation?
                </p>
              </div>
            </ToggleSection>
            
            <ToggleSection title="The $14 Million Check" icon={AlertTriangle} level={1}>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h4 className="font-bold text-red-800 mb-2">True Story: Investment Bank</h4>
                <p className="text-sm text-gray-700 mb-3">
                  A VP at a major investment bank had a messy office. His managing director found 
                  a crumpled $14 million IRS refund check—dated 6 months earlier—buried in a pile.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  Combined with another missing $8 million check, he was fired that day.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <p className="text-sm text-gray-600 italic">
                    <strong>The deeper issue:</strong> 5S would have revealed systemic problems—
                    no tracking process for refund checks, no training on how to handle them. 
                    The mess wasn't just personal failure; it exposed organizational gaps.
                  </p>
                </div>
              </div>
            </ToggleSection>
          </div>
        );
        
      case 'mise-en-place':
        return (
          <div className="space-y-4">
            <ToggleSection title="A Lesson from the Chefs" icon={ChefHat} defaultOpen={true} level={1}>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <blockquote className="italic text-gray-700 mb-2">
                  "Mise-en-place is the religion of all good line cooks. Do not f**k with a line cook's 'meez'...
                  The universe is in order when your station is set up the way you like it: you know where to 
                  find everything with your eyes closed."
                </blockquote>
                <cite className="text-sm text-purple-700">— Anthony Bourdain, Kitchen Confidential</cite>
              </div>
              
              <VisualExample
                title="The Chef's Station"
                visual={
                  <div className="bg-gray-100 rounded-lg p-6">
                    <div className="flex justify-around items-end">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-200 rounded-full mb-2" />
                        <span className="text-xs">Salt</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-200 rounded-full mb-2" />
                        <span className="text-xs">Pepper</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-amber-200 rounded-full mb-2" />
                        <span className="text-xs">Oil</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-200 rounded-full mb-2" />
                        <span className="text-xs">Herbs</span>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-8 bg-gray-400 rounded mb-2" />
                        <span className="text-xs">Towel</span>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">
                      Always the same arrangement. Every. Single. Time.
                    </div>
                  </div>
                }
                explanation="At 8 PM on Saturday with every table full, there's no time to hunt for ingredients. The chef's mise-en-place means knowing where to find everything with eyes closed."
                type="success"
              />
            </ToggleSection>
            
            <ToggleSection title="Why This Matters For You" icon={Target} level={1}>
              <p className="text-gray-700 mb-4">
                You don't work in an operating room or a restaurant kitchen, but the principle applies:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">⚔️</div>
                  <h4 className="font-bold text-blue-800">Soldier</h4>
                  <p className="text-sm text-gray-600">Knows exactly where ammunition is in chaos of battle</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🎨</div>
                  <h4 className="font-bold text-green-800">Artist</h4>
                  <p className="text-sm text-gray-600">Colors always in same spot on palette</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">👩‍⚕️</div>
                  <h4 className="font-bold text-purple-800">Surgeon</h4>
                  <p className="text-sm text-gray-600">Instrument tray identical every time</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-yellow-800 mb-2">🎓 John Wooden's Shoelaces</h4>
                <p className="text-sm text-gray-700">
                  The greatest college basketball coach (10 championships in 12 years) spent the first day of practice 
                  teaching players how to put on socks and tie shoes. Why? A player can't execute complex plays 
                  if thinking about an untied shoe. <strong>Fundamentals must be automatic.</strong>
                </p>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Your Mise-en-Place" icon={LayoutGrid} level={1}>
              <p className="text-gray-700 mb-4">
                Your desk is your workspace (not storage space). Like a surgeon's operating table:
              </p>
              
              <VisualExample
                title="The 3-Tray System"
                visual={
                  <div className="bg-amber-50 rounded-lg p-6">
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <div className="w-20 h-6 bg-green-400 rounded shadow mb-2 flex items-center justify-center text-white text-xs font-bold">IN</div>
                        <span className="text-xs text-gray-600">New stuff only</span>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-6 bg-blue-400 rounded shadow mb-2 flex items-center justify-center text-white text-xs font-bold">OUT</div>
                        <span className="text-xs text-gray-600">Ready to send</span>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-6 bg-purple-400 rounded shadow mb-2 flex items-center justify-center text-white text-xs font-bold">READ</div>
                        <span className="text-xs text-gray-600">Magazines/journals</span>
                      </div>
                    </div>
                  </div>
                }
                explanation="One place for incoming. One for outgoing. One for reading. Your coworkers know where to leave things. You know where to look. No hunting."
                type="success"
              />
            </ToggleSection>
          </div>
        );
        
      case 'out-of-sight':
        return (
          <div className="space-y-4">
            <ToggleSection title="The Common Belief" icon={Eye} defaultOpen={true} level={1}>
              <div className="bg-gray-100 rounded-lg p-6 text-center mb-4">
                <div className="text-4xl mb-4">🤔</div>
                <p className="text-lg italic text-gray-700">
                  "If I put it away, I'll forget about it. I need to SEE it to remember it."
                </p>
              </div>
              <p className="text-gray-700">
                This is the most common justification for keeping piles of paper on desks. 
                People genuinely believe that visibility = memory.
              </p>
            </ToggleSection>
            
            <ToggleSection title="Why It's Absurd" icon={AlertTriangle} level={1}>
              <div className="space-y-4">
                <ToggleSection title="Argument #1: If seeing helped, it wouldn't still be there" level={2}>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-gray-700">
                      If seeing the item on your desk actually helped you get it done, it probably 
                      wouldn't <em>still be sitting there four months later</em>—after you moved it 
                      from the desk to the shelf to the credenza.
                    </p>
                  </div>
                </ToggleSection>
                
                <ToggleSection title="Argument #2: Buried items are invisible anyway" level={2}>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-gray-700">
                      If it's buried under 2.5 inches of newer paper, you can't see it anymore. 
                      By your own logic, you'll forget about it. In a philosophical sense, 
                      <em>it doesn't exist</em>—it might as well be blank paper.
                    </p>
                  </div>
                </ToggleSection>
                
                <ToggleSection title="Argument #3: What about email?" level={2}>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-gray-700">
                      If seeing is critical, how do you handle electronic work? You can't "see" 
                      email on your desk. By your logic, you're doomed to lose track of it all.
                    </p>
                  </div>
                </ToggleSection>
                
                <ToggleSection title="Argument #4: Constant visibility = eventual invisibility" level={2}>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-gray-700">
                      Our senses become desensitized to constant stimuli. People near train tracks 
                      stop hearing trains. You stop <em>really seeing</em> those Post-it notes after a few days.
                    </p>
                    <div className="bg-white rounded p-3 mt-3">
                      <p className="text-sm text-gray-600 italic">
                        <strong>Test it:</strong> Look at your Post-its right now. Is there a phone number 
                        you were supposed to call but can't remember who it's for?
                      </p>
                    </div>
                  </div>
                </ToggleSection>
              </div>
            </ToggleSection>
            
            <ToggleSection title="The Truth" icon={Lightbulb} level={1}>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "If it's on your mind, it's probably not getting done."
                </blockquote>
                <cite className="text-sm text-green-700">— David Allen</cite>
                
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-gray-700">
                    When you leave work on your desk to remind yourself, you're trying to keep it 
                    on your mind—<strong>because you're not doing it</strong>. Instead, put the work away 
                    and create a <em>kanban system</em> that pulls work at the right time.
                  </p>
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="The Real Solution" icon={CheckCircle2} level={1}>
              <VisualExample
                title="Kanban: Pull Work When Needed"
                visual={
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-around">
                      <div className="text-center">
                        <Folder className="mx-auto text-blue-500 mb-2" size={32} />
                        <span className="text-sm">Filed Away</span>
                      </div>
                      <ChevronRight className="text-gray-400" size={24} />
                      <div className="text-center">
                        <Calendar className="mx-auto text-green-500 mb-2" size={32} />
                        <span className="text-sm">Calendar Trigger</span>
                      </div>
                      <ChevronRight className="text-gray-400" size={24} />
                      <div className="text-center">
                        <Target className="mx-auto text-orange-500 mb-2" size={32} />
                        <span className="text-sm">Pull & Work</span>
                      </div>
                    </div>
                  </div>
                }
                explanation="Your calendar acts as a signal (kanban) that pulls work from your files at the RIGHT time. You don't need to see it constantly—you need a system that surfaces it when needed."
                type="success"
              />
            </ToggleSection>
          </div>
        );
        
      case 'frequency-organization':
        return (
          <div className="space-y-4">
            <ToggleSection title="The Problem with Traditional Filing" icon={Folder} defaultOpen={true} level={1}>
              <p className="text-gray-700 mb-4">
                Most people organize by category: "Client A," "Client B," "Budget," etc. This results in 
                giant files where high-value, frequently-used items are buried with rarely-used documents.
              </p>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  <strong>The result:</strong> 80% of your work is buried in the same mass as the 
                  80% of documents you rarely need. You waste time hunting through everything.
                </p>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Frequency-Based System" icon={FolderOpen} level={1}>
              <VisualExample
                title="Three Zones of Organization"
                visual={<FileOrgVisual />}
                explanation="Organize by HOW OFTEN you use it, not WHAT it is. This keeps your most-used 20% of files (containing 80% of your work) instantly accessible."
                type="success"
              />
            </ToggleSection>
            
            <ToggleSection title="Working Files" icon={FileText} level={1}>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">📁 Working Files</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Criteria:</strong> Used frequently (1+ times/week) OR predictable retrieval
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Current client invoices</li>
                  <li>• Open purchase orders</li>
                  <li>• Action items from last meeting</li>
                  <li>• Budget you're actively working on</li>
                </ul>
                <div className="mt-3 p-3 bg-white rounded">
                  <p className="text-sm text-gray-600 italic">
                    <strong>Location:</strong> Desk drawer, within arm's reach
                  </p>
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Reference Files" icon={BookOpen} level={1}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2">📚 Reference Files</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Criteria:</strong> Used infrequently (&lt;1x/month) OR unpredictable retrieval
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Market research reports</li>
                  <li>• Old client correspondence</li>
                  <li>• Company policies</li>
                  <li>• Last year's performance reviews</li>
                </ul>
                <div className="mt-3 p-3 bg-white rounded">
                  <p className="text-sm text-gray-600 italic">
                    <strong>Location:</strong> Filing cabinet, nearby but not cluttering workspace
                  </p>
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Archive Files" icon={Archive} level={1}>
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2">🗄️ Archive Files</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Criteria:</strong> Never plan to use again, but must keep for legal/policy reasons
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tax returns</li>
                  <li>• Ex-employee files</li>
                  <li>• Closed contracts</li>
                  <li>• Old project documentation</li>
                </ul>
                <div className="mt-3 p-3 bg-white rounded">
                  <p className="text-sm text-gray-600 italic">
                    <strong>Location:</strong> Off-site storage, central storage, or deep file drawers
                  </p>
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="The Cardinal Rule" icon={AlertTriangle} level={1}>
              <div className="bg-red-50 border-2 border-red-400 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">⚠️</div>
                <p className="text-lg font-bold text-red-800">
                  NEVER commingle working and reference items
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  This mixing is what leads to giant piles and the waste of "looking for"
                </p>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Apply to Electronics Too" icon={Folder} level={1}>
              <VisualExample
                title="Digital Folder Structure"
                visual={
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                    <div className="space-y-1">
                      <div>📁 <span className="text-green-400">1 Working</span></div>
                      <div className="ml-4">├── 📁 Clients_Active</div>
                      <div className="ml-4">├── 📁 Current_Projects</div>
                      <div className="ml-4">└── 📁 This_Week</div>
                      <div>📁 <span className="text-blue-400">2 Reference</span></div>
                      <div className="ml-4">├── 📁 Clients_Dormant</div>
                      <div className="ml-4">├── 📁 Templates</div>
                      <div className="ml-4">└── 📁 Research</div>
                      <div>📁 <span className="text-gray-400">3 Archive</span></div>
                      <div className="ml-4">├── 📁 2023</div>
                      <div className="ml-4">└── 📁 Closed_Projects</div>
                    </div>
                  </div>
                }
                explanation="Numbering (1, 2, 3) forces correct sort order. Most important at top. Same principle: high-frequency items front and center."
                type="info"
              />
            </ToggleSection>
          </div>
        );
        
      case 'flow':
        return (
          <div className="space-y-4">
            <ToggleSection title="What is Flow?" icon={Workflow} defaultOpen={true} level={1}>
              <p className="text-gray-700 mb-4">
                Flow is the opposite of "batch-and-queue." Instead of letting work pile up and 
                processing it in large batches, work is done continuously, one item at a time, 
                from start to finish.
              </p>
              
              <VisualExample
                title="Batch vs. Flow"
                visual={<FlowComparisonVisual />}
                explanation="Toggle between views. Batch processing creates stress, backlogs, and crisis mode. Flow creates steady progress and psychological calm."
                type="info"
              />
            </ToggleSection>
            
            <ToggleSection title="The Seven Wastes" icon={Trash2} level={1}>
              <p className="text-gray-700 mb-4">
                Taiichi Ohno identified seven wastes that flow helps eliminate:
              </p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: 'Correction/Defects', example: 'Errors in documents', icon: '❌' },
                  { name: 'Conveyance', example: 'Handoffs, moving files', icon: '📦' },
                  { name: 'Overproduction', example: 'Work not requested', icon: '📈' },
                  { name: 'Waiting', example: 'Waiting for next step', icon: '⏳' },
                  { name: 'Processing', example: 'Extra approvals', icon: '📋' },
                  { name: 'Motion', example: 'Looking for things', icon: '🔍' },
                  { name: 'Inventory', example: 'Backlog in inbox', icon: '📥' }
                ].map((waste, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xl">{waste.icon}</span>
                    <div>
                      <div className="font-medium">{waste.name}</div>
                      <div className="text-sm text-gray-600">{waste.example}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ToggleSection>
            
            <ToggleSection title="Psychological Flow" icon={Sparkles} level={1}>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  Psychologist Mihaly Csikszentmihalyi coined "flow" to describe being fully immersed 
                  in an activity—"in the zone." Lean flow and psychological flow are connected:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-500 mt-1 flex-shrink-0" size={16} />
                    <span>Batch-and-queue interrupts focus and prevents "the zone"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-500 mt-1 flex-shrink-0" size={16} />
                    <span>Continuous flow creates conditions for deep work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-purple-500 mt-1 flex-shrink-0" size={16} />
                    <span>Both types of flow improve quality AND wellbeing</span>
                  </li>
                </ul>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Multitasking is a Myth" icon={XCircle} level={1}>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                <blockquote className="italic text-gray-700 mb-2">
                  "Multitasking is going to slow you down, increasing the chances of mistakes."
                </blockquote>
                <cite className="text-sm text-red-700">— David Meyer, University of Michigan</cite>
              </div>
              
              <ToggleSection title="The Research" level={2}>
                <ul className="space-y-2 text-gray-700">
                  <li>• University of Michigan: Multitasking takes 1.5x longer than sequential work</li>
                  <li>• Gloria Mark (UC Irvine): Workers spend only 11 minutes on any project before interruption</li>
                  <li>• Each 11-minute block is broken into 3-minute tasks</li>
                  <li>• 40% of the time, people wander off after interruptions, distracted</li>
                </ul>
              </ToggleSection>
              
              <ToggleSection title="Serial Tasking Solutions" level={2}>
                <ul className="space-y-2 text-gray-700">
                  <li>• Group similar tasks into blocks</li>
                  <li>• Establish "office hours" for interruptions</li>
                  <li>• Use visible signs: "Do Not Disturb Until ___"</li>
                  <li>• Turn off email alerts</li>
                  <li>• Keep notepad next to computer for quick "to-dos" that pop up</li>
                </ul>
              </ToggleSection>
            </ToggleSection>
            
            <ToggleSection title="Worst First" icon={Target} level={1}>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-800 mb-2">🥦 The Brussels Sprouts Principle</h4>
                <p className="text-gray-700 mb-3">
                  Kids eat vegetables first, dessert second. Otherwise they push sprouts around forever. 
                  Adults are the same: We do easy/fun stuff first and avoid hard/unpleasant tasks.
                </p>
                <div className="bg-white rounded p-4">
                  <p className="font-medium text-gray-800 mb-2">Solution: Do the WORST thing FIRST</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Before email, before coffee, before anything "fun"</li>
                    <li>• Even 15 minutes on hard stuff first thing</li>
                    <li>• Use enjoyable work as reward for completing hard work</li>
                  </ul>
                </div>
              </div>
            </ToggleSection>
          </div>
        );
        
      case '4ds':
        return (
          <div className="space-y-4">
            <ToggleSection title="The 4D Framework" icon={CheckCircle2} defaultOpen={true} level={1}>
              <p className="text-gray-700 mb-4">
                When processing your inbox (paper or electronic), apply ONE of these 4Ds to each item. 
                Nothing returns to the inbox. Value always moves forward.
              </p>
              
              <VisualExample
                title="Interactive 4D Decision Flow"
                visual={<FourDWorkflowVisual />}
                explanation="Click through examples. Each item gets exactly one treatment. No item goes back to the inbox. This keeps value flowing to customers."
                type="info"
              />
            </ToggleSection>
            
            <ToggleSection title="DO IT" icon={CheckCircle2} level={1}>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={20} /> If it takes less than 2 minutes, DO IT NOW
                </h4>
                <p className="text-gray-700 mb-3">
                  Quick emails, simple decisions, brief phone calls—handle immediately.
                </p>
                <div className="text-sm text-gray-600 bg-white rounded p-3">
                  <strong>Example:</strong> Assistant asks for day off next week. Look at calendar, 
                  check for conflicts, reply. Done.
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="DELEGATE IT" icon={Users} level={1}>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                  <Users size={20} /> Someone else is better suited
                </h4>
                <p className="text-gray-700 mb-3">
                  If someone has more knowledge, time, or skill, delegate it.
                </p>
                <div className="text-sm text-gray-600 bg-white rounded p-3">
                  <strong>Example:</strong> Boss asks for research analysis. Delegate to team member 
                  with research skills. Add follow-up reminder to your task list for the due date.
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="DESIGNATE IT" icon={Calendar} level={1}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <Calendar size={20} /> Schedule time for complex tasks
                </h4>
                <p className="text-gray-700 mb-3">
                  Longer tasks (30+ minutes) need a designated time in your calendar.
                </p>
                <div className="text-sm text-gray-600 bg-white rounded p-3">
                  <strong>Example:</strong> Colleague asks you to review a manuscript. Block 45 minutes 
                  next Thursday, 3-4 PM. Put manuscript in working file. It's off your desk but not forgotten.
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="DISCARD IT" icon={Trash2} level={1}>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <Trash2 size={20} /> Irrelevant or insignificant? Trash it.
                </h4>
                <p className="text-gray-700 mb-3">
                  Be honest. Will you really read that newsletter? Delete it now.
                </p>
                <div className="text-sm text-gray-600 bg-white rounded p-3">
                  <strong>Example:</strong> Industry newsletter arrives, but your schedule is packed 
                  for 4 days. You won't read it. Discard NOW. Not "later."
                </div>
              </div>
            </ToggleSection>
            
            <ToggleSection title="The $327 Million Email" icon={AlertTriangle} level={1}>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h4 className="font-bold text-red-800 mb-2">NASA Mars Climate Orbiter</h4>
                <p className="text-gray-700 mb-3">
                  In 1999, NASA's $327 million spacecraft burned up entering Mars atmosphere. 
                  The famous cause: Imperial vs. metric unit mismatch.
                </p>
                <p className="text-gray-700 mb-3">
                  The real cause: <strong>An unanswered email about the measurement units</strong> 
                  with no follow-up. Someone read it and planned to "get back to it later."
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <p className="text-sm text-gray-600 italic">
                    If they had DESIGNATED time for that email—scheduled a meeting with key 
                    engineers before orbital insertion—the mission might have succeeded.
                  </p>
                </div>
              </div>
            </ToggleSection>
          </div>
        );
        
      case 'daily-work':
        return (
          <div className="space-y-4">
            <ToggleSection title="Living in Your Calendar" icon={Calendar} defaultOpen={true} level={1}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-gray-700">
                  Most people "live in their inbox"—letting incoming messages drive their day. 
                  This means other people's priorities control your time.
                </p>
              </div>
              
              <VisualExample
                title="The Old Movies Had It Right"
                visual={
                  <div className="bg-amber-50 rounded-lg p-6">
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <div className="text-5xl mb-2">📅</div>
                        <div className="font-bold text-amber-800">Calendar</div>
                        <div className="text-sm text-gray-600">Front & Center</div>
                      </div>
                      <div className="text-4xl text-gray-400">vs</div>
                      <div className="text-center">
                        <div className="text-5xl mb-2">📧</div>
                        <div className="font-bold text-gray-500">Email</div>
                        <div className="text-sm text-gray-400">Off to the side</div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-4">
                      1950s executives had calendars front and center, phones to the side.
                      Today's executives should have calendars open, email minimized.
                    </p>
                  </div>
                }
                explanation="Your calendar shows YOUR priorities. Your inbox shows OTHER PEOPLE's priorities. Live in the calendar, check inbox at scheduled times."
                type="success"
              />
            </ToggleSection>
            
            <ToggleSection title="Calendar as Kanban" icon={Box} level={1}>
              <p className="text-gray-700 mb-4">
                A kanban is a signal that tells you when to pull work. Your calendar can function 
                as a kanban—triggering work at the right time.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">Benefits of Calendar-as-Kanban:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Match your production capacity to demand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Pull work at the right time (not too early, not too late)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Don't rely on memory—system surfaces work when needed</span>
                  </li>
                </ul>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Task Pad for Small Items" icon={FileText} level={1}>
              <p className="text-gray-700 mb-4">
                Calendar is great for 1+ hour blocks. For small tasks (&lt;30 min), use the task pad:
              </p>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="font-mono text-sm">
                  <div className="flex items-center gap-2 p-2 bg-white rounded mb-2">
                    <input type="checkbox" className="rounded" />
                    <span>Follow up with Sarah on Henderson file</span>
                    <span className="ml-auto text-xs text-blue-600">Start: Wed</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded mb-2">
                    <input type="checkbox" className="rounded" />
                    <span>Call travel dept re: itinerary</span>
                    <span className="ml-auto text-xs text-blue-600">Start: Mon</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded">
                    <input type="checkbox" className="rounded" />
                    <span>Review Q3 numbers before meeting</span>
                    <span className="ml-auto text-xs text-blue-600">Start: Thu</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important: Use START dates, not DUE dates</h4>
                <p className="text-sm text-gray-700">
                  If you set a DUE date, the task shows up every day until then—annoying and 
                  eventually invisible. A START date means it appears only when you should act.
                </p>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Don't Treat Calendar Like Gas Tank" icon={AlertTriangle} level={1}>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-gray-700 mb-3">
                  Don't pack your calendar 100% full like filling a gas tank. Without slack, 
                  any disturbance causes gridlock—like rush-hour traffic.
                </p>
                <p className="text-gray-700">
                  Leave buffer time. Life is unpredictable. A packed calendar has no room 
                  to adapt when emergencies happen.
                </p>
              </div>
            </ToggleSection>
            
            <ToggleSection title="Lower the Water Level" icon={Workflow} level={1}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  Toyota talks about "lowering the water level" to expose hidden problems (rocks). 
                  In your case, the water = time. Having too much time hides inefficiencies.
                </p>
                
                <ToggleSection title="The Vacation Paradox" level={2}>
                  <p className="text-gray-700">
                    Before vacation, you somehow crank through all your daily work PLUS the backlog 
                    that's been sitting for months. What happened? With less time, you work more 
                    efficiently. You eliminate waste because you HAVE to.
                  </p>
                </ToggleSection>
                
                <div className="bg-white rounded p-4 mt-4">
                  <h5 className="font-medium mb-2">Try reducing:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Staff meetings from 60 to 45 minutes</li>
                    <li>• Leave office 30 minutes earlier one day/week</li>
                    <li>• 15 fewer minutes on email daily</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2 italic">
                    Constraints force creativity. Parkinson's Law: Work expands to fill time available.
                  </p>
                </div>
              </div>
            </ToggleSection>
          </div>
        );
        
      default:
        return <p>Content coming soon...</p>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="text-white py-8 px-4"
        style={{ backgroundColor: concept.color }}
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Concepts</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <IconComponent size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{concept.title}</h1>
              <p className="text-white/80">{concept.subtitle}</p>
            </div>
          </div>
          
          <p className="mt-4 text-lg italic text-white/90">"{concept.tagline}"</p>
          <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
            Chapter {concept.chapter}
          </div>
        </div>
      </header>
      
      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-200 mt-8">
        <p>Created by Lorenzo Colombani ©2026</p>
      </footer>
    </div>
  );
};

// Landing Page
const LandingPage = ({ onSelectConcept }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero */}
      <header className="text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            A Factory of <span className="text-orange-400">One</span>
          </h1>
          <p className="text-xl text-blue-200 mb-2">
            Applying Lean Principles to Banish Waste and Improve Your Personal Performance
          </p>
          <p className="text-sm text-blue-300">Based on the book by Daniel Markovitz</p>
          
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-orange-400 font-bold">8</span>
              <span className="text-blue-200 ml-2">Core Concepts</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-green-400 font-bold">4</span>
              <span className="text-blue-200 ml-2">Chapters Covered</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-purple-400 font-bold">∞</span>
              <span className="text-blue-200 ml-2">Improvement Potential</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Concept Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Core Concepts</h2>
          <p className="text-blue-300">Click any concept to explore in depth</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {concepts.map((concept) => {
            const IconComponent = concept.icon;
            return (
              <button
                key={concept.id}
                onClick={() => onSelectConcept(concept)}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${concept.color}20` }}
                >
                  <IconComponent size={28} style={{ color: concept.color }} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{concept.title}</h3>
                <p className="text-sm text-blue-300 mb-3">{concept.subtitle}</p>
                <p className="text-xs text-gray-400 line-clamp-2">{concept.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-blue-400">Chapter {concept.chapter}</span>
                  <ChevronRight className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" size={16} />
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Visual Metaphor */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">You Are a Factory of One</h3>
            <p className="text-blue-300 mt-2">
              Just like a factory, you process raw materials (information) to produce value for customers.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-blue-500/20 px-4 py-3 rounded-lg text-center">
              <div className="text-2xl mb-1">📥</div>
              <div className="text-sm text-white font-medium">Inputs</div>
              <div className="text-xs text-blue-300">Email, requests, data</div>
            </div>
            <ChevronRight className="text-white/30" size={24} />
            <div className="bg-orange-500/20 px-4 py-3 rounded-lg text-center">
              <div className="text-2xl mb-1">⚙️</div>
              <div className="text-sm text-white font-medium">Process</div>
              <div className="text-xs text-orange-300">Your work methods</div>
            </div>
            <ChevronRight className="text-white/30" size={24} />
            <div className="bg-green-500/20 px-4 py-3 rounded-lg text-center">
              <div className="text-2xl mb-1">📤</div>
              <div className="text-sm text-white font-medium">Outputs</div>
              <div className="text-xs text-green-300">Value for customers</div>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-400 mt-6">
            The concepts above help you optimize this factory for maximum efficiency and minimum waste.
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-sm space-y-1">
        <p className="text-blue-400">Interactive learning app • Based on "A Factory of One" by Daniel Markovitz</p>
        <p className="text-blue-300">Created by Lorenzo Colombani ©2026</p>
      </footer>
    </div>
  );
};

// Main App
export default function FactoryOfOneApp() {
  const [selectedConcept, setSelectedConcept] = useState(null);
  
  if (selectedConcept) {
    return (
      <ConceptDetail 
        concept={selectedConcept} 
        onBack={() => setSelectedConcept(null)} 
      />
    );
  }
  
  return <LandingPage onSelectConcept={setSelectedConcept} />;
}
