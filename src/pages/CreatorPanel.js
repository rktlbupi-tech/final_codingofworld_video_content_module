import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  Video, 
  Link as LinkIcon,
  FileText,
  Send,
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { categories } from '@/data/mockData';
import { toast } from 'sonner';

const CreatorPanel = () => {
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    tags: '',
  });

  const [lessonForm, setLessonForm] = useState({
    courseId: '',
    title: '',
    description: '',
    duration: '',
    videoUrl: '',
    resources: '',
    notes: '',
  });

  const [requestForm, setRequestForm] = useState({
    title: '',
    description: '',
    category: '',
  });

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    toast.success('🎉 Course submitted for review!', {
      description: 'Our team will review your submission shortly.',
    });
    setCourseForm({
      title: '',
      description: '',
      category: '',
      difficulty: '',
      duration: '',
      tags: '',
    });
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();
    toast.success('✅ Lesson submitted successfully!', {
      description: 'Your lesson has been added to the review queue.',
    });
    setLessonForm({
      courseId: '',
      title: '',
      description: '',
      duration: '',
      videoUrl: '',
      resources: '',
      notes: '',
    });
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    toast.success('💡 Course request submitted!', {
      description: 'Thank you for your suggestion. We\'ll consider it for future content.',
    });
    setRequestForm({
      title: '',
      description: '',
      category: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-4xl font-bold">
            Creator <span className="gradient-text">Panel</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Share your knowledge and help others learn
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Submissions', value: '12', icon: Send, color: 'text-primary' },
          { label: 'Approved', value: '8', icon: CheckCircle2, color: 'text-success' },
          { label: 'In Review', value: '4', icon: FileText, color: 'text-warning' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Form Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-border shadow-lg">
          <Tabs defaultValue="course" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="course" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  New Course
                </TabsTrigger>
                <TabsTrigger value="lesson" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  New Lesson
                </TabsTrigger>
                <TabsTrigger value="request" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Request Course
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Create New Course */}
              <TabsContent value="course" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Create a New Course Series</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit a complete course series with structured content
                  </p>
                </div>
                <Separator />
                <form onSubmit={handleCourseSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-title">Course Title *</Label>
                      <Input
                        id="course-title"
                        placeholder="e.g., Advanced React Patterns"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-duration">Duration *</Label>
                      <Input
                        id="course-duration"
                        placeholder="e.g., 8 weeks"
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course-description">Description *</Label>
                    <Textarea
                      id="course-description"
                      placeholder="Provide a detailed description of your course..."
                      rows={4}
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select 
                        value={courseForm.category} 
                        onValueChange={(value) => setCourseForm({ ...courseForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty Level *</Label>
                      <Select 
                        value={courseForm.difficulty} 
                        onValueChange={(value) => setCourseForm({ ...courseForm, difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course-tags">Tags (comma-separated)</Label>
                    <Input
                      id="course-tags"
                      placeholder="e.g., React, Hooks, Context API"
                      value={courseForm.tags}
                      onChange={(e) => setCourseForm({ ...courseForm, tags: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Course for Review
                  </Button>
                </form>
              </TabsContent>

              {/* Add New Lesson */}
              <TabsContent value="lesson" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Add a New Lesson</h3>
                  <p className="text-sm text-muted-foreground">
                    Contribute individual lessons to existing courses
                  </p>
                </div>
                <Separator />
                <form onSubmit={handleLessonSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Course *</Label>
                    <Select 
                      value={lessonForm.courseId} 
                      onValueChange={(value) => setLessonForm({ ...lessonForm, courseId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Complete DSA Fundamentals</SelectItem>
                        <SelectItem value="2">Advanced Algorithm Design</SelectItem>
                        <SelectItem value="3">Full Stack Web Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lesson-title">Lesson Title *</Label>
                      <Input
                        id="lesson-title"
                        placeholder="e.g., Understanding useReducer"
                        value={lessonForm.title}
                        onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lesson-duration">Duration *</Label>
                      <Input
                        id="lesson-duration"
                        placeholder="e.g., 25 min"
                        value={lessonForm.duration}
                        onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lesson-description">Description *</Label>
                    <Textarea
                      id="lesson-description"
                      placeholder="Brief description of the lesson content..."
                      rows={3}
                      value={lessonForm.description}
                      onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lesson-video">Video URL (YouTube/Custom) *</Label>
                    <div className="relative">
                      <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lesson-video"
                        className="pl-10"
                        placeholder="https://youtube.com/..."
                        value={lessonForm.videoUrl}
                        onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lesson-resources">External Resources (one per line)</Label>
                    <Textarea
                      id="lesson-resources"
                      placeholder={`LeetCode Problem: https://leetcode.com/...
GFG Article: https://geeksforgeeks.org/...`}
                      rows={3}
                      value={lessonForm.resources}
                      onChange={(e) => setLessonForm({ ...lessonForm, resources: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lesson-notes">Lesson Notes</Label>
                    <Textarea
                      id="lesson-notes"
                      placeholder="Key takeaways, important concepts, tips..."
                      rows={3}
                      value={lessonForm.notes}
                      onChange={(e) => setLessonForm({ ...lessonForm, notes: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Lesson
                  </Button>
                </form>
              </TabsContent>

              {/* Request New Course */}
              <TabsContent value="request" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Request a New Course</h3>
                  <p className="text-sm text-muted-foreground">
                    Suggest topics you'd like to see covered on the platform
                  </p>
                </div>
                <Separator />
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="request-title">Course Title *</Label>
                    <Input
                      id="request-title"
                      placeholder="e.g., Blockchain Development with Solidity"
                      value={requestForm.title}
                      onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="request-description">Why is this course needed? *</Label>
                    <Textarea
                      id="request-description"
                      placeholder="Explain why this course would be valuable and what topics it should cover..."
                      rows={5}
                      value={requestForm.description}
                      onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Suggested Category</Label>
                    <Select 
                      value={requestForm.category} 
                      onValueChange={(value) => setRequestForm({ ...requestForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Tip:</strong> Be specific about what you want to learn. The more details you provide,
                      the better we can understand your needs and create relevant content.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreatorPanel;