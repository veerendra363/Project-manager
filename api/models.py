from django.db import models

# Organization model
class Organization(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)  # URL-friendly unique identifier
    contact_email = models.EmailField()   # Official contact email

    def __str__(self):
        return self.name

# Project model
class Project(models.Model):
    STATUS_CHOICES = [
        ('PL', 'Planned'),
        ('IP', 'In Progress'),
        ('CO', 'Completed'),
        ('ON', 'On Hold'),
    ]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default='PL')
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.organization.name})"

# Task model
class Task(models.Model):
    STATUS_CHOICES = [
        ('TD', 'To Do'),
        ('IP', 'In Progress'),
        ('DN', 'Done'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default='TD')
    assignee_email = models.EmailField()

    def __str__(self):
        return f"{self.title} ({self.project.name})"

# TaskComment model
class TaskComment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    author_email = models.EmailField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author_email} on {self.task.title}"
