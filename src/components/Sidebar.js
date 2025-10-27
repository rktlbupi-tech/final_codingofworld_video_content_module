import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  PenTool, 
  Shield, 
  GraduationCap,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { categories } from '@/data/mockData';
import { Badge } from './ui/badge';

const iconMap = {
  Database: () => <span className="text-lg">💾</span>,
  Globe: () => <span className="text-lg">🌐</span>,
  Brain: () => <span className="text-lg">🧠</span>,
  Network: () => <span className="text-lg">🔗</span>,
  Smartphone: () => <span className="text-lg">📱</span>,
  Server: () => <span className="text-lg">⚙️</span>,
};

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Browse Courses' },
    { to: '/creator', icon: PenTool, label: 'Creator Panel' },
    { to: '/admin', icon: Shield, label: 'Admin Panel', badge: '2' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AlgoTrail</h1>
            <p className="text-xs text-muted-foreground">Learn & Grow</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-foreground hover:bg-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant={isActive ? 'secondary' : 'default'} className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}

        <Separator className="my-4" />

        {/* Categories */}
        <div className="space-y-2">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Categories
          </p>
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <button
                key={category.id}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-all text-left"
              >
                {IconComponent && <IconComponent />}
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
          <p className="text-sm font-semibold mb-1">Need help?</p>
          <p className="text-xs text-muted-foreground mb-3">
            Check our documentation or contact support
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Get Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;