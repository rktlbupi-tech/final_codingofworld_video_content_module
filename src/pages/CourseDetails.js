import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock,
  ExternalLink,
  FileText,
  Star,
  Users,
  BookOpen
} from 'lucide-react';
import { courses, lessons } from '@/data/mockData';
import { toast } from 'sonner';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(courseId));
  const courseLessons = lessons[courseId] || [];
  
  const [selectedLesson, setSelectedLesson] = useState(courseLessons[0] || null);
  const [completedLessons, setCompletedLessons] = useState(
    JSON.parse(localStorage.getItem(`course-${courseId}-completed`) || '[]')
  );

  useEffect(() => {
    localStorage.setItem(`course-${courseId}-completed`, JSON.stringify(completedLessons));
  }, [completedLessons, courseId]);

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
      </div>
    );
  }

  const progress = courseLessons.length > 0 
    ? Math.round((completedLessons.length / courseLessons.length) * 100) 
    : 0;

  const toggleLessonComplete = (lessonId) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) {
        toast.info('Lesson marked as incomplete');
        return prev.filter((id) => id !== lessonId);
      } else {
        toast.success('Lesson completed! 🎉');
        return [...prev, lessonId];
      }
    });
  };

  const difficultyColors = {
    beginner: 'bg-success/10 text-success border-success/20',
    intermediate: 'bg-warning/10 text-warning border-warning/20',
    advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/courses')} className="group">
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Courses
      </Button>

      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-border shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Thumbnail */}
            <div className="relative md:col-span-1">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover min-h-[200px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Course Info */}
            <div className="md:col-span-2 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${difficultyColors[course.difficulty]} border capitalize`}>
                      {course.difficulty}
                    </Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-warning fill-warning" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{course.enrollments.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-secondary" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Course Progress</span>
                  <span className="font-semibold text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {completedLessons.length} of {courseLessons.length} lessons completed
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lesson List Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="border-border sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Course Content</span>
                <Badge variant="outline">{courseLessons.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {courseLessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isSelected = selectedLesson?.id === lesson.id;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-all ${
                        isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`font-medium text-sm ${
                              isSelected ? 'text-primary' : ''
                            }`}>
                              {index + 1}. {lesson.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          {selectedLesson ? (
            <>
              {/* Video Player */}
              <Card className="border-border shadow-lg overflow-hidden">
                <div className="aspect-video bg-muted">
                  <iframe
                    src={selectedLesson.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedLesson.title}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{selectedLesson.title}</h2>
                      <p className="text-muted-foreground">{selectedLesson.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant={completedLessons.includes(selectedLesson.id) ? 'outline' : 'default'}
                      onClick={() => toggleLessonComplete(selectedLesson.id)}
                      className="ml-4 flex-shrink-0"
                    >
                      {completedLessons.includes(selectedLesson.id) ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Circle className="mr-2 h-4 w-4" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lesson Details */}
              <Card className="border-border">
                <Tabs defaultValue="resources" className="w-full">
                  <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="resources" className="space-y-3">
                      <h3 className="font-semibold mb-3">Practice Problems & Links</h3>
                      {selectedLesson.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-primary/10">
                              <ExternalLink className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium group-hover:text-primary transition-colors">
                              {resource.title}
                            </span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </TabsContent>
                    <TabsContent value="notes">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <div className="flex items-start gap-3 mb-3">
                            <FileText className="h-5 w-5 text-primary mt-0.5" />
                            <h3 className="font-semibold text-base m-0">Lesson Notes</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed m-0">
                            {selectedLesson.notes}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </>
          ) : (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Select a lesson to begin</h3>
                <p className="text-muted-foreground">
                  Choose a lesson from the sidebar to start learning
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;