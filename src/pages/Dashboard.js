import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Clock,
  Target,
  Zap,
  ArrowRight,
  Award
} from 'lucide-react';
import { courses } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 6,
    enrolledCourses: 3,
    completedLessons: 12,
    totalLessons: 45,
    overallProgress: 27,
    streak: 7,
  });

  const recentCourses = courses.slice(0, 3);

  const statCards = [
    {
      title: 'Enrolled Courses',
      value: stats.enrolledCourses,
      total: stats.totalCourses,
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Completed Lessons',
      value: stats.completedLessons,
      total: stats.totalLessons,
      icon: Trophy,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Learning Streak',
      value: `${stats.streak} days`,
      icon: Zap,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Overall Progress',
      value: `${stats.overallProgress}%`,
      icon: Target,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-2">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Welcome back, <span className="gradient-text">Learner</span>! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Continue your learning journey and achieve your goals
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-border hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  {stat.total && (
                    <Badge variant="outline" className="text-xs">
                      {stat.value}/{stat.total}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">
                    {stat.total ? stat.value : stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-border shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Learning Progress
                </CardTitle>
                <CardDescription>
                  Keep up the great work! You're {stats.overallProgress}% towards your goal
                </CardDescription>
              </div>
              <Award className="h-8 w-8 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Overall Completion</span>
                <span className="text-primary">{stats.overallProgress}%</span>
              </div>
              <Progress value={stats.overallProgress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {stats.completedLessons} of {stats.totalLessons} lessons completed
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Learning Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <Button variant="ghost" onClick={() => navigate('/courses')} className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card className="border-border hover:shadow-elegant transition-all group cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm">
                    {course.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span>{course.totalLessons} lessons</span>
                    </div>
                    <Progress value={Math.random() * 60} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle>Explore New Courses</CardTitle>
            <CardDescription>
              Discover courses across multiple domains and expand your skillset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/courses')} className="w-full">
              Browse Courses
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-accent/5 to-warning/5">
          <CardHeader>
            <CardTitle>Share Your Knowledge</CardTitle>
            <CardDescription>
              Become a creator and contribute courses to the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/creator')} variant="outline" className="w-full">
              Go to Creator Panel
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;