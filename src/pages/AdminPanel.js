import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  XCircle, 
  Clock,
  Shield,
  FileText,
  User,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { submissions } from '@/data/mockData';
import { toast } from 'sonner';

const AdminPanel = () => {
  const [submissionList, setSubmissionList] = useState(submissions);

  const handleApprove = (id) => {
    setSubmissionList((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: 'approved' } : sub))
    );
    toast.success('✅ Submission approved!', {
      description: 'The content has been published to the platform.',
    });
  };

  const handleReject = (id) => {
    setSubmissionList((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: 'rejected' } : sub))
    );
    toast.error('❌ Submission rejected', {
      description: 'The submitter will be notified.',
    });
  };

  const stats = {
    pending: submissionList.filter((s) => s.status === 'pending').length,
    approved: submissionList.filter((s) => s.status === 'approved').length,
    rejected: submissionList.filter((s) => s.status === 'rejected').length,
  };

  const statusColors = {
    pending: 'bg-warning/10 text-warning border-warning/20',
    approved: 'bg-success/10 text-success border-success/20',
    rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const difficultyColors = {
    beginner: 'bg-success/10 text-success',
    intermediate: 'bg-warning/10 text-warning',
    advanced: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">
            Admin <span className="gradient-text">Panel</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Review and manage content submissions
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-warning mb-1">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-success mb-1">{stats.approved}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
                <div className="p-3 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-destructive mb-1">{stats.rejected}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Notice Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm mb-1">Admin Interface (Mock UI)</p>
            <p className="text-sm text-muted-foreground">
              This is a demonstration of the admin approval interface. In production, this would connect to a backend API
              for real content management and user notifications.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Submissions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle>Content Submissions</CardTitle>
            <CardDescription>
              Review and approve or reject submitted courses and lessons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {submissionList.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
                <p className="text-sm text-muted-foreground">
                  New content submissions will appear here for review
                </p>
              </div>
            ) : (
              submissionList.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="border border-border rounded-lg p-5 hover:shadow-md transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Content Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-md bg-primary/10 mt-1">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="text-lg font-semibold">{submission.title}</h3>
                              <Badge className={`${statusColors[submission.status]} border capitalize`}>
                                {submission.status}
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {submission.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {submission.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {submission.submittedBy}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(submission.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                              <Badge 
                                variant="outline" 
                                className={`${difficultyColors[submission.difficulty]} capitalize text-xs`}
                              >
                                {submission.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs capitalize">
                                {submission.category.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {submission.status === 'pending' && (
                        <div className="flex gap-2 lg:flex-col">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(submission.id)}
                            className="flex-1 lg:flex-none"
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(submission.id)}
                            className="flex-1 lg:flex-none"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {submission.status === 'approved' && (
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-medium text-sm">Approved & Published</span>
                        </div>
                      )}

                      {submission.status === 'rejected' && (
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="h-5 w-5" />
                          <span className="font-medium text-sm">Rejected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {index < submissionList.length - 1 && <Separator className="my-4" />}
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Admin Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-border bg-gradient-to-br from-secondary/5 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Review Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Ensure content is accurate, well-structured, and provides value to learners</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Verify that video links are working and resources are accessible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Check for appropriate difficulty level and category assignment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Maintain quality standards consistent with platform guidelines</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminPanel;